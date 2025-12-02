import React from "react";
import { ActionType, Room, useModelDispatch } from "@virola/model";
import { RoomAvatar } from "@virola/components"

import styles from "./RoomItem.module.scss";
import { useCurrentRoomId } from "@virola/controller";
import Badge from "./Badge";


interface RoomItemProps {
	room: Room;
}

export function RoomItem({ room }: RoomItemProps) {
	const currentRoomId = useCurrentRoomId();
	const dispatch = useModelDispatch();

	function isCurrent(): boolean {
		return currentRoomId === room.roomId;
	}

	function onItemClicked() {
		dispatch({ type: ActionType.SetCurrentRoom, roomId: room.roomId });
	}

	return (
		<div onClick={onItemClicked} className={ styles.roomItem + " " + (isCurrent() ? styles.current : "") }>
			<div className={ styles.itemContent }>
				<RoomAvatar room={room} isSmall={true} />
				<div className={ styles.roomTitle }>{room.displayName}</div>
				<Badge count={room.unreadMessageCount} />
			</div>
			<hr/>
		</div>
	)
}
