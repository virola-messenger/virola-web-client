import React, { MouseEvent } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import styles from './TextMessageBubble.module.scss';
import { TextMessage, MarkupType, MessageType, IssueProperties, IssueStatus } from '@virola/model';
import TextMessageAttachments from './TextMessageAttachments'
import TextMessageFooter from './TextMessageFooter';
import TextMessageHeader from './TextMessageHeader';
import HtmlSanitizer from './HtmlSanitizer';


type TextMessageBubbleProps = {
	message: TextMessage;
	isUnread: boolean;
	isFirstMessage: boolean;
	isOwnMessage: boolean;
	isRightAligned: boolean;
	isInDiscussion?: boolean;
	onContextMenu?: (left: number, top: number, messageId: number, attachmentId?: number) => void;
};

export default function TextMessageBubble({ message, isUnread, isFirstMessage, isOwnMessage, isRightAligned, isInDiscussion, onContextMenu }: TextMessageBubbleProps) {
	const background = backgroundStyle(message, isOwnMessage, isUnread);
	const corners = styles.rounded;
	const tail = isFirstMessage
		? (isRightAligned ? styles.tailRight : styles.tailLeft)
		: ""; // No tail if not the first message


	function onContextMenuRequested(event: MouseEvent<HTMLDivElement>) {
		event.preventDefault();
		event.stopPropagation();

		if (onContextMenu) {
			onContextMenu(event.clientX, event.clientY, message.messageId);
		}
	}

	function onAttachmentContextMenuRequested(x: number, y: number, attachmentId: number) {
		if (onContextMenu) {
			onContextMenu(x, y, message.messageId, attachmentId);
		}
	}

	return (
		<div className={ `${styles.bubble} ${background} ${corners} ${tail}` } onContextMenu={ onContextMenuRequested } >
			<TextMessageHeader message={ message }/>
			<Content message={ message }/>
			<TextMessageAttachments attachments={ message.attachments } onContextMenu={ onAttachmentContextMenuRequested } />
			<TextMessageFooter 
				message = { message } 
				isOwnMessage = { isOwnMessage }
				isInDiscussion = { isInDiscussion }
					/>
		</div>
	);
}

function backgroundStyle(message: TextMessage, isOwnMessage: boolean, isUnread: boolean): string {
	if (isUnread) {
		return styles.unread;
	} else if (message.messageType === MessageType.Meeting) {
		return styles.meeting;
	} else if (message.messageType === MessageType.Issue) {
		return issueBackgroundStyle(message);
	} else if (isOwnMessage) {
		return styles.own;
	} else {
		return styles.other;
	}
}

function issueBackgroundStyle(message: TextMessage): string {
	const properties = message.issueProperties;
	if (properties) {
		if (properties.status === IssueStatus.Backlog) {
			return styles.issueBacklog;
		} else if (properties.status === IssueStatus.InProgress) {
			return styles.issueInProgress;
		} else if (properties.status === IssueStatus.ToDo) {
			return styles.issueTodo;
		} else if (properties.status === IssueStatus.Done) {
			return styles.issueDone;
		} else if (properties.status === IssueStatus.ToVerify) {
			return styles.issueToVerify;
		} else if (properties.status === IssueStatus.Declined) {
			return styles.issueDeclined;
		}
	}

	return styles.issueDefault;
}

function Content({ message }: { message: TextMessage }) {
	const topPadding = topPaddingStyle(message);
	const bottomPadding = bottomPaddingStyle(message);

	function textToHtml(text: string): string {
		const paragraphs = text.split(/\n\n/);
		const html = paragraphs.map(paragraph => {
			return '<p>' + paragraph.replace(/\n/g, '<br>') + '</p>';
		}).join('');
		return html;
	}

	function makdownToHtml(text: string): string {
		const html = unified()
			.use(remarkParse)
			.use(remarkRehype)
			.use(rehypeStringify)
			.processSync(text);
		return html.toString();
	}

	function escapeHtml(unsafe: string): string {
		return unsafe
			.replaceAll("&", "&amp;")
			.replaceAll("<", "&lt;")
			.replaceAll(">", "&gt;")
			.replaceAll('"', "&quot;")
			.replaceAll("'", "&#039;")
			.replaceAll("`", "&#x60;")
			;
	};

	function toSafeHtml(message: TextMessage): string {
		let text = message.text || "";

		if (message.markupType === MarkupType.TextHtml) {
			return HtmlSanitizer.sanitize(text);
		} else if (message.markupType === MarkupType.TextMarkdown) {
			return HtmlSanitizer.sanitize(makdownToHtml(text));
		} else {
			return textToHtml(escapeHtml(text));
		}
	}

	if (message.text) {
		return (
			<div 
				className={ styles.content + " " + topPadding + " " + bottomPadding } 
				dangerouslySetInnerHTML={{ __html:toSafeHtml(message) }}>
			</div>
		);
	} else {
		return <></>;
	}
}

function topPaddingStyle(message: TextMessage): string {
	if (message.messageType === MessageType.Meeting) {
		return styles.topPadding;
	} else {
		return "";
	}
}

function bottomPaddingStyle(message: TextMessage): string {
	if (message.messageType !== MessageType.Regular) {
		return styles.bottomPadding;
	} else {
		return "";
	}
}