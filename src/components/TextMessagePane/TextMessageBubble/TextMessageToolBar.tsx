import React from "react";
import { TextMessage, MessageType } from "@virola/model";

import styles from './TextMessageToolBar.module.scss';
import { MessagePriorityIcon, IssueTypeIcon, IssueStatusIcon } from "./ToolBarIcons";

interface TextMessageToolBarProps {
	message: TextMessage;
}

export default function TextMessageToolBar({ message }: TextMessageToolBarProps) {
	if (message.messageType === MessageType.Meeting) {
		return <MeetingToolBar message={message} />;
	} else if (message.messageType === MessageType.Issue) {
		return <IssueToolBar message={message} />; 
	} else {
		return (
			<></>
		);
	}
}

function MeetingToolBar({ message }: TextMessageToolBarProps) {
	return (
		<div className={styles.toolbar}>
			<div className={styles.messageId}>{`# ${message.messageId}`}</div>
			<MessagePriorityIcon priority={message.priority} />
		</div>
	);
}

function IssueToolBar({ message }: TextMessageToolBarProps) {
	const issueProperties = message.issueProperties;
	return (
		<div className={styles.toolbar}>
			<div className={styles.messageId}>{`# ${message.messageId}`}</div>
			{ issueProperties && <IssueTypeIcon type={issueProperties.type} /> }
			{ issueProperties && <IssueStatusIcon status={issueProperties.status} /> }
			<MessagePriorityIcon priority={message.priority} />
		</div>
	);
}