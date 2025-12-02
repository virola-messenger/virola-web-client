import React from "react";
import { TextMessage, MessageType, IssueStatus } from "@virola/model";
import DiscussionBar from "./DiscussionBar";
import TextMessageToolBar from "./TextMessageToolBar";

import styles from './TextMessageFooter.module.scss';

interface TextMessageFooterProps {
	message: TextMessage;
	isOwnMessage: boolean;
	isInDiscussion?: boolean;
}

export default function TextMessageFooter({ message, isOwnMessage, isInDiscussion }: TextMessageFooterProps) {
	const background = backgroundStyle(message);

	return (
		<div className={styles.footer + ' ' + background}>
			<TextMessageToolBar message={ message } />
			<DiscussionBar 
				message={ message } 
				isOwnMessage={ isOwnMessage } 
				isInDiscussion={ isInDiscussion } 
			/>
		</div>
	)
}

function backgroundStyle(message: TextMessage): string {
	if (message.messageType == MessageType.Meeting) {
		return styles.meeting;
	} else if (message.messageType == MessageType.Issue) {
		const issueProperties = message.issueProperties;
		if (issueProperties) {
			return issueBackgroundStyle(issueProperties.status);
		}
	}

	return "";
}

function issueBackgroundStyle(issueStatus: IssueStatus): string {
	switch (issueStatus) {
		case IssueStatus.Backlog:
			return styles.issueBacklog;
		case IssueStatus.ToDo:
			return styles.issueTodo;
		case IssueStatus.InProgress:
			return styles.issueInProgress;
		case IssueStatus.ToVerify:
			return styles.issueToVerify;
		case IssueStatus.Done:
			return styles.issueDone;
		case IssueStatus.Declined:
			return styles.issueDeclined;
		default:
			return "";
	}
}