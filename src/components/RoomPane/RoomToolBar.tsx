import React from "react";
import { useRoom } from "@virola/controller";
import { ActionType, useModelDispatch } from "@virola/model";
import RoomAvatar from "./RoomAvatar";

import styles from "./RoomToolBar.module.scss";
import ArrowLeft from "@virola/assets/images/arrow-left.svg?react";
import { Badge } from "../NavigationPane";


interface RoomToolBarProps {
	currentRoomId: number;
}

export default function RoomToolBar({ currentRoomId }: RoomToolBarProps) {
	const room = useRoom(currentRoomId);
	const discussionMessageId = room?.discussionMessageId;
	const dispatch = useModelDispatch();

	function onBackButtonClicked() {
		dispatch({ type: ActionType.SetCurrentDiscussion, roomId: currentRoomId, discussionMessageId: null });
	}

	if (room) {
		return ( 
			<div className={ styles.roomToolbar }>
				{ discussionMessageId && <ArrowLeft className={ styles.toolButton } onClick={ onBackButtonClicked } /> }
				<RoomAvatar room={ room } />
				<div className={ styles.toolbarTitle }>{ room.displayName }</div>
				<Badge count={ room.unreadMessageCount } />
			</div>
		);
	} else {
		return <></>;
	}
}