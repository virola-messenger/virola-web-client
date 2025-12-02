import { TextMessageList } from "./TextMessageList";
import { Room } from "./Room";
import { User } from "./User";
import { AuthStatus } from "./AuthStatus";
import { RoomPermissions } from "./RoomPermissions";

export interface Model {
	authStatus: AuthStatus;
	myUserId: number;
	curentRoomId: number | null;
	users: User[] | null;
	rooms: Room[] | null;
	roomPermissions: Map<number, RoomPermissions>;
	messages: Map<number, TextMessageList>;
	comments: Map<number, TextMessageList>;
}

export function initialModel(authStatus: AuthStatus = AuthStatus.Unknown): Model {
	return {
		authStatus: authStatus,
		myUserId: 0,
		curentRoomId: null,
		users: null,
		rooms: null,
		roomPermissions: new Map<number, RoomPermissions>(),
		messages: new Map<number, TextMessageList>(),
		comments: new Map<number, TextMessageList>()
	};
}