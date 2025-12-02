import React from "react";
import { MessageType, TextMessage } from "@virola/model";

import styles from './TextMessageHeader.module.scss';

interface TextMessageHeaderProps {
	message: TextMessage;
}

export default function TextMessageHeader({ message }: TextMessageHeaderProps) {
	if (message.messageType === MessageType.Meeting) {
		return (
			<div className={styles.meeting}>Meeting @ Aug 11, 2025 15:00 PM, 00:30</div>
		);
	} else {
		return (
			<></>
		);
	}
}