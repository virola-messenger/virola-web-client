import React from "react";
import { TextMessagePane } from "@virola/components";
import { TextMessageEditor } from "@virola/components";

import styles from "./TextMessenger.module.scss";
import SplitterBar from "./SplitterBar";

interface TextMessengerProps {
	currentRoomId: number;
	discussionId?: number | null;
}

export default function TextMessenger({ currentRoomId, discussionId }: TextMessengerProps) {
	return (
		<div className={ styles.messengerContainer }>
			<div className={ styles.messagePaneItem }>
				<TextMessagePane currentRoomId={ currentRoomId } discussionId={ discussionId } />
			</div>
			<div className={ styles.dividerItem }>
				<hr/>
			</div>
			<SplitterBar />
			<div className={ styles.messageEditorItem }>
				<TextMessageEditor currentRoomId={ currentRoomId } discussionId={ discussionId } />
			</div>
		</div>
	);
}