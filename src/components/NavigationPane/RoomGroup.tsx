import React, { useState } from 'react';
import { Room } from '@virola/model';
import { RoomItem } from './RoomItem';

import styles from './RoomGroup.module.scss';
import Collapsed from '@virola/assets/images/collapsed.svg?react';
import Expanded from '@virola/assets/images/expanded.svg?react';

type RoomGroupProps = {
	title: string;
	roomList: Room[];
}

export function RoomGroup({ title, roomList }: RoomGroupProps) {
	const [isExpanded, setIsExpanded] = useState(true);

	if (roomList.length > 0) {
		return (
			<>
				<div className={ styles.groupHeader } onClick={ () => setIsExpanded(!isExpanded) }>
					{ isExpanded ? <Expanded /> : <Collapsed /> }{ title }
				</div>
				{ isExpanded &&
					roomList.map(room => 
						<RoomItem
							key={room.roomId} 
							room={room}
						/>
					) 			
				}
			</>
		);
	} else {
		return <></>;
	}
}
