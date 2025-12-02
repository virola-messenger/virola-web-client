import { useEffect } from "react";
import { Room, useModel, ActionType } from "@virola/model";
import { useNetwork } from "@virola/network";

export function useRooms(): Room[] {
	const network = useNetwork();
	const [ model, dispatch ] = useModel();
	const rooms = model.rooms;
	
	useEffect(() => {
			let ignore = false;

			if (rooms == null) {
				network.fetchRooms().then(rooms => {
					if (!ignore) {
						setRooms(rooms);
					}
				});
			}
	
			return () => { ignore = true; }
		}
		, []
	);	

	function setRooms(rooms: Room[]) {
		dispatch({ type: ActionType.SetRooms, rooms });
	}

	return rooms || [];
}

export function useRoom(roomId: number): Room | null {
	const rooms = useRooms();
	return rooms.find(room => room.roomId === roomId) || null;
}

export function useCurrentRoomId(): number | null {
	const model = useModel()[0];
	return model.curentRoomId;
}

export function useCurrentRoom(): Room | null {
	const curentRoomId = useCurrentRoomId();
	if (curentRoomId) {
		return useRoom(curentRoomId);
	}
	return null;
}