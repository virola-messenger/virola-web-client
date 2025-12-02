import React, { useEffect, useRef } from 'react';
import { useNetwork } from '@virola/network';
import { useMessage, useMessagePermissions } from '@virola/controller';
import { ActionType, useModel } from '@virola/model';

import styles from './TextMessageMenu.module.scss';

import TrashCan from '@virola/assets/images/trash-can.svg?react';
import PaperClip from '@virola/assets/images/paper-clip.svg?react';
import CopyText from '@virola/assets/images/copy-text.svg?react';
import Edit from '@virola/assets/images/edit.svg?react';
import Chat from '@virola/assets/images/chat.svg?react';

interface ContextMenuProps {
	pos: {left: number;	top: number};
	messageId: number;
	attachmentId?: number;
	ref: React.RefObject<HTMLDivElement | null>;
	onClick?: () => void;
}

export default function TextMessageMenu({ pos, messageId, attachmentId, ref, onClick }: ContextMenuProps) {
	const network = useNetwork();
	const message = useMessage(messageId);
	const [_, dispatch] = useModel();

	const permissions = useMessagePermissions(messageId);

	function onMenuItemClicked() {
		if (onClick) {
			onClick();
		}
	}

	function onDiscussionClicked() {
		if (message) {
			dispatch({ type: ActionType.SetCurrentDiscussion, roomId: message.roomId, discussionMessageId: message.messageId });
		}
		onMenuItemClicked();
	}

	function onDeleteMessageClicked() {
		if (confirm('The message will be permanently deleted for all users.\n\nAre you sure you want to proceed?')) {
			network.deleteMessage(messageId);
		}
		onMenuItemClicked();
	}

	function onDeleteAttachmentClicked() {
		if (attachmentId) {
			if (confirm('The attachment will be permanently deleted for all users.\n\nAre you sure you want to proceed?')) {
				network.deleteAttachment(attachmentId);
			}
		}
		onMenuItemClicked();
	}

	function onCopyTextClicked() {
		if (message) {
			navigator.clipboard.writeText(message.text).catch(err => {
				console.error('Failed to copy text: ', err);
			});
		}
		onMenuItemClicked();
	}

	function onEditMessageClicked() {
		if (message) {
			alert('Edit functionality is not implemented yet');
		}
		onMenuItemClicked();
	}

	useEffect(() => {
		const menu = ref.current;
		if (menu) {
			if (pos.left > window.innerWidth / 2) {
				menu.style.setProperty('--dx', '100%');
			}

			if (pos.top > window.innerHeight / 2) {
				menu.style.setProperty('--dy', '100%');
			}

			menu.style.setProperty('--mouse-x', `${pos.left}px`);
			menu.style.setProperty('--mouse-y', `${pos.top}px`);
		}
	}, [pos, ref]);

	return (
		<div className={styles.menu}  ref={ ref }>
			<MenuItem onClick = { onDiscussionClicked }>
				<Chat stroke="var(--vc-context-menu-text-color)" fill="var(--vc-context-menu-text-color)"/>
				Discussion
			</MenuItem>
			<hr/>
			<MenuItem onClick = { onCopyTextClicked }>
				<CopyText stroke="var(--vc-context-menu-text-color)"/>
				Copy as Text
			</MenuItem>
			<hr/>
			<MenuItem onClick = { onEditMessageClicked } enabled={ permissions.canEdit }>
				<Edit stroke="var(--vc-context-menu-text-color)"/>
				Edit Message
			</MenuItem>
			<AttachFileMenuItem messageId={ messageId } onClick={ onMenuItemClicked } enabled={ permissions.canAttachFiles } />
			<hr/>
			{ attachmentId &&
				<MenuItem onClick = { onDeleteAttachmentClicked } enabled={ permissions.canDeleteAttachedFiles }>
					<PaperClip stroke={ "red" }/> 
					Delete Attachment
				</MenuItem>
			}
			<MenuItem onClick = { onDeleteMessageClicked } enabled={ permissions.canDelete }>
				<TrashCan stroke = { "red" }/> 
				Delete Message
			</MenuItem>
		</div>
	);
}

type AttachFileMenuItemProps = {
	messageId: number;
	enabled?: boolean;
	onClick?: () => void;
};

function AttachFileMenuItem({ messageId, onClick, enabled } : AttachFileMenuItemProps) {
	const network = useNetwork();
	const inputFileRef = useRef<HTMLInputElement>(null);

	
	function onAttachFileClicked() {
		const inputFile = inputFileRef.current;
		if (inputFile) {
			inputFile.click();
		}
	}

	function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
		const files = event.target.files;
		if (files && files.length > 0) {
			network.attachFiles(messageId, Array.from(files));
		}

		if (onClick) {
			onClick();
		}
	}

	return (
		<MenuItem onClick={onAttachFileClicked} enabled={ enabled }>
			<PaperClip stroke="var(--vc-context-menu-text-color)" />
			Attach File
			<input multiple style={{ display: 'none' }} type="file" onInput={ handleFileChange } ref={ inputFileRef } />
		</MenuItem>
	);
}

function MenuItem({ children, enabled, onClick }: { children: React.ReactNode; enabled?: boolean; onClick?: () => void }) {
	const disabled = enabled === false;
	return (
		<div 
			className={`${styles.menuItem} ${disabled ? styles.disabled : ''}`} 
			onClick={ disabled ? undefined : onClick}>
			{children}
		</div>
	);
}