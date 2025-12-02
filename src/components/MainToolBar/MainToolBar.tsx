import React from "react";
import { useNetwork, Network } from "@virola/network";
import { useModel } from "@virola/model";

import styles from "./MainToolBar.module.scss";
import virolaLogo from "@virola/assets/images/virola-logo.svg";

export default function MainToolBar() {
	const network = useNetwork();

	function onLogoutClicked() {
		network.logout();
	}

	return (
		<div className={ styles.toolbarContainer }>
			<UserAvatar />
			<button onClick={onLogoutClicked}>Logout</button>
		</div>
	);
}

function UserAvatar() {
	const [ model, _] = useModel();

	if (model.myUserId !== 0) {
		const url = Network.userAvatarUrl(model.myUserId);
		return <img className={ styles.avatar } src={ url } />;
	} else {
		return <img src={ virolaLogo } alt="Logo" />;
	}
}