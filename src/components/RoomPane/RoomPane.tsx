import React, { useEffect, useRef } from "react";
import RoomToolBar from "./RoomToolBar";
import { TextMessenger } from "@virola/components";

import styles from "./RoomPane.module.scss";
import { useRoom } from "@virola/controller";

interface RoomPaneProps {
	currentRoomId: number;
}

export default function RoomPane({ currentRoomId }: RoomPaneProps) {
	const room = useRoom(currentRoomId);
	const currentDiscussionId = room?.discussionMessageId;

	const mainMessengerRef = useRef<HTMLDivElement>(null);
	const discussionMessengerRef = useRef<HTMLDivElement>(null);

	function currentMesseger() {
		if (currentDiscussionId) {
			return discussionMessengerRef.current;
		} else {
			return mainMessengerRef.current;
		}
	}

	useEffect(() => {
		const messenger = currentMesseger();
		if (messenger) {
			messenger.scrollIntoView();
		}
	}, [currentDiscussionId]);

	return (
		<div className={ styles.roomPaneContainer }>
			<div className={ styles.toolbarItem }>
				<RoomToolBar currentRoomId={ currentRoomId } />
			</div>
			<div className={ styles.messengerItem }>
				<div className={ styles.messenger } ref={ mainMessengerRef}>
					<TextMessenger currentRoomId = { currentRoomId }/>
				</div>
				<div className={ styles.messenger } ref={ discussionMessengerRef}>
					<TextMessenger currentRoomId = { currentRoomId } discussionId = { currentDiscussionId } />
				</div>
			</div>
		</div> 
	);
}