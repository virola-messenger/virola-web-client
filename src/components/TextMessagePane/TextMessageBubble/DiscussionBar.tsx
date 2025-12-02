import React from "react";
import { ActionType, TextMessage, useModelDispatch } from "@virola/model";

import styles from "./DiscussionBar.module.scss";

import ArrowRight from "@virola/assets/images/arrow-right.svg?react";

interface DiscussionBarProps {
	message: TextMessage;
	isOwnMessage: boolean;
	isInDiscussion?: boolean;
}

export default function DiscussionBar({ message, isOwnMessage, isInDiscussion }: DiscussionBarProps) {
	const borderColor = isOwnMessage ? styles.own : styles.other;
	const strokeColor = isOwnMessage ? styles.ownStroke : styles.otherStroke;
	const dispatch = useModelDispatch();

	function showComments() {
		dispatch({ type: ActionType.SetCurrentDiscussion, roomId: message.roomId, discussionMessageId: message.messageId });
	}

	if (message.commentCount > 0 && !isInDiscussion) {
		return (
			<>
				<div className={ styles.discussionBar }>
					<hr className= { borderColor } />
					<div className={ styles.commentsSection } onClick={showComments}>
						<div>{ formatStatusMessage(message.commentCount) }</div>
						<ArrowRight className={ strokeColor }/>
					</div>
				</div>
			</>
		);
	} else {
		return <></>
	}
}

function formatStatusMessage(commentCount: number): string {
	if (commentCount == 1) {
		return `${commentCount} comment`;
	} else {
		return `${commentCount} comments`;
	}
}