import { useEffect } from "react";
import { RoomPermissions, useModel, ActionType, allDeniedRoomPermissions, allGrantedRoomPermissions } from "@virola/model";
import { useNetwork } from "@virola/network";
import { useMessage } from "./useMessages";
import { useMyUser } from "./useUsers";
import { useRoom } from "./useRooms";

export function useRoomPermissions(roomId: number): RoomPermissions | null {
	const network = useNetwork();
	const [ model, dispatch ] = useModel();
	const permissions = model.roomPermissions.get(roomId) || null;

	useEffect(() => {
		let ignore = false;

		if (!permissions) {
			network.fetchRoomPermissions(roomId).then(result => {
				if (!ignore && result && result.roomId === roomId) {
					dispatch({ 
						type: ActionType.SetRoomPermissions, 
						roomId: result.roomId, 
						permissions: result.permissions 
					});
				}
			});
		}

		return () => { ignore = true; }
	}, [roomId]);

	return permissions;
}
