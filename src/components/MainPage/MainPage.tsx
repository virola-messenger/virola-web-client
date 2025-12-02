import React, { useState, useEffect, use } from 'react';
import { MainToolBar } from '@virola/components';
import { NavigationPane } from '@virola/components';
import { RoomPane } from '@virola/components';
import { useCurrentRoomId } from '@virola/controller';
import { ActionType, useModelDispatch } from '@virola/model';

import styles from './MainPage.module.scss';
import { useNetwork } from '@virola/network/useNetwork';
import { ServerEventHandler } from '@virola/model/events/ServerEventHandler';
import SplitterBar from './SplitterBar';

export default function MainPage() {
	const currentRoomId = useCurrentRoomId();
	const dispatch = useModelDispatch();
	const network = useNetwork();

	function onNetworkEvent(event: MessageEvent) {
		const eventHandler = new ServerEventHandler(dispatch);
		eventHandler.onNetworkEvent(event);
	}

	useEffect(() => {
		if (currentRoomId === null) {
			const savedRoomId = savedCurrentRoomId();
			if (savedRoomId !== null) {
				dispatch({ type: ActionType.SetCurrentRoom, roomId: savedRoomId });
			}
		}
	}, []);

	useEffect(() => {
		network.eventReceived.connect(onNetworkEvent);

		return () => {
			network.eventReceived.disconnect(onNetworkEvent);
		};
	}, [network])

	useEffect(() => {
		if (currentRoomId) {
			sessionStorage.setItem('currentRoomId', String(currentRoomId));
		} else {
			sessionStorage.removeItem('currentRoomId');
		}
	}, [currentRoomId]);

	return (
		<div className={styles.mainPage}>
			<div className={ styles.leftSidebar }>
				<MainToolBar />
				<NavigationPane />
			</div>
			<SplitterBar />
			<div className={ styles.centralPane }>
				{ currentRoomId && <RoomPane currentRoomId={ currentRoomId }/> }
			</div>
		</div>
	);
}

function savedCurrentRoomId(): number | null {
	const roomId = sessionStorage.getItem('currentRoomId');
	return roomId ? parseInt(roomId) : null;
}
