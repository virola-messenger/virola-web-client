import React, { useState, useEffect, useRef } from 'react';
import { TextMessage, ActionType, useModel } from '@virola/model';
import { useMessages, useComments } from '@virola/controller';
import { useNetwork } from '@virola/network';

import TextMessageItem, { DiscussedMessageItem } from './TextMessageItem';
import ListView, { Direction } from './ListView';
import useVisibleMessageReader from './useVisibleMessageReader';
import TextMessageMenu from './TextMessageMenu';

interface TextMessagePaneProps {
	currentRoomId: number;
	discussionId?: number | null;
}

export default function TextMessagePane({ currentRoomId, discussionId }: TextMessagePaneProps) {
	const [menuVisible, setMenuVisible] = useState(false);
	const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
	const [menuMessageId, setMenuMessageId] = useState<number>(0);
	const [menuAttachmentId, setMenuAttachmentId] = useState<number | undefined>(undefined);
	const menuRef = useRef<HTMLDivElement>(null);

	function onContextMenu(left: number, top: number, messageId: number, attachmentId?: number) {
		setMenuPosition({ top, left });
		setMenuVisible(true);
		setMenuMessageId(messageId);
		setMenuAttachmentId(attachmentId);
	}
	
	function handleClickOutside(event: Event) {
		if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
			setMenuVisible(false);
		} 
	};

	function onMenuItemClicked() {
		setMenuVisible(false);
	}

	useEffect(() => {
		window.addEventListener('mousedown', handleClickOutside);
		return () => {
			window.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	if (discussionId) {
		return (
			<>
				{ menuVisible && 
					<TextMessageMenu 
						messageId = { menuMessageId } 
						attachmentId = { menuAttachmentId } 
						pos = { menuPosition } 
						ref = { menuRef } 
						onClick={ onMenuItemClicked }/>
				}
				<DiscussionMessagesView discussionId = { discussionId } onContextMenu = { onContextMenu } />
			</>
		);
	} else if (currentRoomId) {
		return ( 
			<>
				{ menuVisible && 
					<TextMessageMenu 
						messageId = { menuMessageId } 
						attachmentId = { menuAttachmentId } 
						pos = { menuPosition } 
						ref = { menuRef } 
						onClick={ onMenuItemClicked } />
				}
				<TopMessagesView currentRoomId = { currentRoomId } onContextMenu = { onContextMenu } />
			</>
		);
	} else {
		return <EmptyListView />;
	}
}

type TopMessagesViewProps = { 
	currentRoomId: number;
	onContextMenu?: (left: number, top: number, messageId: number) => void;
};
 
function TopMessagesView({ currentRoomId, onContextMenu }: TopMessagesViewProps) {
	const network = useNetwork();
	const messages = useMessages(currentRoomId);
	const [model, dispatch] = useModel();

	function fetchMessages(cursor: number, direction: Direction): Promise<void> {
		const limit = 100;

		console.log("TextMessagePane.fetchMessages cursor:", cursor, "direction:", direction, "messages.length:", messages.length);

		return network.fetchMessages(currentRoomId, cursor, limit, direction).then(fetchedMessages => {
			if (fetchedMessages.length > 0) {
				dispatch({ type: ActionType.AddMessages, roomId: currentRoomId, messages: fetchedMessages });
			}
		});
	}

	const [ listViewRef, onItemCreated ] = useVisibleMessageReader(messages, network, model.myUserId);

	return (
		<MessageListView context={ currentRoomId } messages={ messages } fetch={ fetchMessages } ref={ listViewRef }>
			{ 
				messages.map((message, index) => 
					<TextMessageItem 
						key={ message.messageId } 
						index={ index } 
						messages={ messages } 
						ref={ onItemCreated } 
						onContextMenu={ onContextMenu }/>
				) 
			}
		</MessageListView>
	);
}

type DiscussionMessagesViewProps = {
	discussionId: number;
	onContextMenu?: (left: number, top: number, messageId: number) => void;
};

function DiscussionMessagesView({ discussionId, onContextMenu }: DiscussionMessagesViewProps) {
	const network = useNetwork();
	const messages = useComments(discussionId);
	const [model, dispatch] = useModel();

	function fetchMessages(cursor: number, direction: Direction): Promise<void> {
		const limit = 100;

		console.log("TextMessagePane.fetchMessages cursor:", cursor, "direction:", direction, "messages.length:", messages.length);

		return network.fetchComments(discussionId, cursor, limit, direction).then(fetchedMessages => {
			if (fetchedMessages.length > 0) {
				dispatch({ type: ActionType.AddComments, parentMessageId: discussionId, comments: fetchedMessages });
			}
		});
	}

	const [ listViewRef, onItemCreated ] = useVisibleMessageReader(messages, network, model.myUserId);

	return (
		<MessageListView context={ discussionId } messages={ messages } fetch={ fetchMessages } isSecondaryView={ true } ref={ listViewRef }>
			<DiscussedMessageItem discussionId={ discussionId } />
			{
				messages.map((message, index) => 
					<TextMessageItem 
						key={ message.messageId } 
						index={ index } 
						messages={ messages } 
						isInDiscussion={ true }
						ref={ onItemCreated }
						onContextMenu = { onContextMenu } />
				)
			}
		</MessageListView>
	);
}

function EmptyListView() {
	function fetchMessages(cursor: number, direction: Direction): Promise<void> {
		return Promise.resolve();
	}

	return (
		<ListView context={ 0 } prevCursor={ 0 } nextCursor={ 0 } fetch={ fetchMessages } isSecondaryView={ true }>
		</ListView>
	);
}

interface MessageListViewProps extends React.PropsWithChildren {
	context: number;
	messages: TextMessage[];
	fetch: (cursor: number, direction: Direction) => Promise<void>;
	isSecondaryView?: boolean; // Used for discussion view
	ref?: React.RefObject<HTMLDivElement | null>;
}

function MessageListView({ context, messages, fetch, ref, isSecondaryView, children }: MessageListViewProps) {
	var prevCursor = -1;
	var nextCursor = 0;

	if (messages.length > 0) {
		prevCursor = messages[0].messageId;
		nextCursor = messages[messages.length - 1].messageId;
	}

	return (
		<ListView context={ context } prevCursor={ prevCursor } nextCursor={ nextCursor } fetch={ fetch } ref={ ref } isSecondaryView={ isSecondaryView }>
			{ children }
		</ListView>
	);
}
