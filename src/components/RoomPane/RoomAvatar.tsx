import React, { useState } from "react";
import { Room, RoomType } from "@virola/model";
import { Network } from "@virola/network";

import styles from "./RoomAvatar.module.scss";
import UserPicturePlacehoder from '@virola/assets/images/user-picture-placeholder.svg?react';

type RoomAvatarProps = {
	room: Room;
	isSmall?: boolean;
};

export default function RoomAvatar({ room, isSmall }: RoomAvatarProps) {
	const size = isSmall ? "small" : "normal";
	const [showUserPicturePlaceholder, setShowUserPicturePlaceholder] = useState(false);

	function initials(name: string): string {
		const names = name.split(" ");
		var initials = names.map(n => n.charAt(0).toUpperCase());

		const alphabeticInitials = initials.filter(initial => initial.charCodeAt(0) >= 65 && initial.charCodeAt(0) <= 90);
		if (alphabeticInitials.length > 0) {
			initials = alphabeticInitials;
		}

		return initials
			.slice(0, 3)
			.join("");
	}

	if (room.roomType == RoomType.Private) {
		const url = Network.roomAvatarUrl(room.roomId);

		if (showUserPicturePlaceholder) {
			return <div className={ `${styles.avatar} ${styles[size]}` }><UserPicturePlacehoder/></div>;
		} else {
			return <img 
				className={ `${styles.avatar} ${styles[size]}` } 
				src={ url } 
				onError={ () => setShowUserPicturePlaceholder(true) }
				alt={ room.displayName }
			/>;
		}
	} else {
		return (
			<div className={ `${styles.circle} ${styles[size]}` }>
				{ initials(room.displayName) }
			</div>
		);
	}
} 