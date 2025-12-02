import React, { useState } from "react";
import { Network } from "@virola/network";

import styles from "./UserAvatar.module.scss";
import UserPicturePlacehoder from '@virola/assets/images/user-picture-placeholder.svg?react';

export default function UserAvatar({ userId }: { userId: number }) {
	const [showUserPicturePlaceholder, setShowUserPicturePlaceholder] = useState(false);

	if (showUserPicturePlaceholder) {
		return <div className={ styles.avatar }><UserPicturePlacehoder/></div>;
	} else {
		const url = Network.userAvatarUrl(userId);
		return <img 
			className={ styles.avatar } 
			src={ url } 
			onError={ () => setShowUserPicturePlaceholder(true) }
		/>;
	}
} 