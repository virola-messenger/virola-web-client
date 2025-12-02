import React, { useState } from "react";
import { useNetwork } from "@virola/network";

import styles from "./TextMessageEditor.module.scss";

type TextMessageEditorProps = {
	currentRoomId?: number | null;
	discussionId?: number | null;
};

export default function TextMessageEditor({currentRoomId, discussionId}: TextMessageEditorProps) {
	const [textAreaText, setTextAreaText] = useState("");
	const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true);
	const network = useNetwork();

	function onTextAreaTextChanged(event: React.ChangeEvent<HTMLTextAreaElement>) {
		const text = event.target.value;
		setIsSendButtonDisabled(currentRoomId === null && text.trim().length == 0);
		setTextAreaText(text);
	};

	function onSendClicked(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		event.preventDefault();
		sendMessage();
	}

	function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			sendMessage();
		}
	}

	function sendMessage() {
		const message = textAreaText.trim();
		if (message.length > 0) {
			if (discussionId) {
				network.sendComment(discussionId, message);
			} else if (currentRoomId) {
				network.sendMessage(currentRoomId, message);
			}

			setTextAreaText("");
		}
	}

	return (
		<form className={ styles.textMessageEditor }>
			<textarea placeholder="Write a message..." value={ textAreaText } onChange={ onTextAreaTextChanged } onKeyDown={onKeyDown}/>
			<button type="submit" disabled={ isSendButtonDisabled } onClick={ onSendClicked }>Send</button>
		</form>
	);
}