import React from "react";
import { useModel } from '@virola/model';
import { TextMessage } from '@virola/model';
import { useUser } from '@virola/controller';

import UserAvatar from './UserAvatar';
import TextMessageBubble from './TextMessageBubble/TextMessageBubble';

import styles from './TextMessageItem.module.scss';

type TextMessageItemProps = {
	index: number;
	messages: TextMessage[];
	isInDiscussion?: boolean;
	ref?: React.Ref<HTMLDivElement>;
	onContextMenu?: (left: number, top: number, messageId: number) => void;
};

export default function TextMessageItem({ index, messages, isInDiscussion, ref, onContextMenu }: TextMessageItemProps) {
	const message = messages[index];
	const isFirstMessage = index === 0 || messages[index - 1].userId !== message.userId;

	return (
		<TextMessageItemView 
			isFirstMessage={ isFirstMessage } 
			message={ message } 
			isInDiscussion={ isInDiscussion } 
			ref={ ref }
			onContextMenu={ onContextMenu } />
	);
}

type DiscussedMessageItemProps = {	
	discussionId: number;
	onContextMenu?: (left: number, top: number, messageId: number) => void;
};

export function DiscussedMessageItem({ discussionId, onContextMenu }: DiscussedMessageItemProps) {
	const isFirstMessage = true;
	const [ model ] = useModel();
	const message = findMessageById(discussionId);

	function findMessageById(messageId: number): TextMessage | undefined {
		for (const room of model.rooms || []) {
			if (room.discussionMessageId === discussionId) {
				const messages = model.messages.get(room.roomId);
				if (messages) {
					return messages.messages.find(message => message.messageId === messageId);
				}
				return undefined;
			}
		}
		return undefined;
	}

	if (message) {
		return (
			<TextMessageItemView 
				isFirstMessage = { isFirstMessage } 
				message = { message }
				isInDiscussion = { true }
				onContextMenu = { onContextMenu } />
		);
	} else {
		return <></>;
	}
}

type TextMessageItemViewProps = {
	isFirstMessage: boolean;
	message: TextMessage;
	isInDiscussion?: boolean;
	ref?: React.Ref<HTMLDivElement>;
	onContextMenu?: (left: number, top: number, messageId: number) => void;
};

function TextMessageItemView({ isFirstMessage, message, isInDiscussion, ref, onContextMenu }: TextMessageItemViewProps ) {
	const [ model ] = useModel();
	const isOwnMessage = message.userId === model.myUserId; 
	const isUnread = isMessageUnread(message, model.myUserId);
	const containerClass = isOwnMessage ? styles.itemContainerRight : styles.itemContainerLeft;
	
	return (
		<div className={ containerClass } ref={ ref } data-message-id={ message.messageId }>
			{ isFirstMessage && !isOwnMessage && <div></div> }
			{ isFirstMessage && <UserName userId={ message.userId } /> }
			{ isFirstMessage && !isOwnMessage && <UserAvatar userId={ message.userId } /> }
			{ !isFirstMessage && !isOwnMessage && <div></div> }

			<TextMessageBubble 
				key = { message.messageId } 
				message = { message } 
				isUnread = { isUnread }
				isFirstMessage = { isFirstMessage }
				isOwnMessage = { isOwnMessage }
				isRightAligned = { isOwnMessage }
				isInDiscussion = { isInDiscussion }
				onContextMenu = { onContextMenu }/>
		</div>
	);
}

function UserName({ userId }: { userId: number }) {
	const user = useUser(userId);

	function displayName() {
		if (user) {
			return user.displayName;
		} else {
			return "User (" + userId + ")";
		}
	}

	return <div className={ styles.userName }>{ displayName() }</div>;
}

function isMessageUnread(message: TextMessage, myUserId: number): boolean {
	if (message.readTimestamps) {
		for (const readTimestamp of message.readTimestamps) {
			if (readTimestamp.userId === myUserId) {
				return false;
			}
		}
		return true;
	} else {
		return false;
	}
}