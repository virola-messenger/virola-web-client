import React from 'react';
import { RoomItem } from './RoomItem';
import { useRooms } from '@virola/controller';
import { Room, RoomType } from '@virola/model/Room';

import styles from './NavigationPane.module.scss';
import { RoomGroup } from './RoomGroup';

export default function NavigationPane() {
	const rooms = useRooms();

	const pinnedRooms = rooms
		.filter(room => room.isPinned)
		.sort(compareRooms);

	const privateRooms = rooms
		.filter(room => room.roomType === RoomType.Private && !room.isArchived && !room.isPinned)
		.sort(compareRooms);

	const publicRooms = rooms
		.filter(room => room.roomType === RoomType.Public && !room.isArchived && !room.isPinned)
		.sort(compareRooms);

	const archivedRooms = rooms
		.filter(room => room.isArchived)
		.sort(compareRooms);

	return (
		<div className={ styles.navigationPaneContainer }>
		<div className={ styles.navigationPane }>
			<RoomGroup title="Pinned Rooms" roomList={ pinnedRooms } />
			<RoomGroup title="Private Rooms" roomList={ privateRooms } />
			<RoomGroup title="Public Rooms" roomList={ publicRooms } />
			<RoomGroup title="Archived Rooms" roomList={ archivedRooms } />
		</div>
		</div>
	);
}

function compareRooms(lhs: Room, rhs: Room): number {
	if (lhs.lastMessage && rhs.lastMessage) {
		return rhs.lastMessage.createdUtc - lhs.lastMessage.createdUtc;
	} else if (lhs.lastMessage) {
		return -1;
	} else if (rhs.lastMessage) {
		return 1;
	} else {
		return 0;
	}
}