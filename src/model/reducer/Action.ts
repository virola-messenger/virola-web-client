import { TextMessage } from '../TextMessage';
import { Room } from '../Room';
import { User } from '../User';
import { AuthStatus } from '../AuthStatus';
import { RoomPermissions } from '../RoomPermissions';

export const enum ActionType {
	SetAuthStatus,
	SetMyUserId,
	SetCurrentRoom,
	SetMessages,
	AddMessages,
	UpdateMessages,
	DeleteMessage,
	SetComments,
	AddComments,
	UpdateComments,
	DeleteComments,

	SetRooms,
	AddRoom,
	UpdateRoom,
	DeleteRoom,
	SetCurrentDiscussion,

	SetRoomPermissions,
	
	SetUsers
}

export type Action = 
	| { type: ActionType.SetAuthStatus, authStatus: AuthStatus }
	| { type: ActionType.SetMyUserId, userId: number }
	| { type: ActionType.SetCurrentRoom, roomId: number }
	| { type: ActionType.SetMessages, roomId: number, messages: TextMessage[] }
	| { type: ActionType.AddMessages, roomId: number, messages: TextMessage[] }
	| { type: ActionType.UpdateMessages, roomId: number, messages: TextMessage[] }
	| { type: ActionType.DeleteMessage, roomId: number, messageId: number }
	| { type: ActionType.SetComments, parentMessageId: number, comments: TextMessage[] }
	| { type: ActionType.AddComments, parentMessageId: number, comments: TextMessage[] }
	| { type: ActionType.UpdateComments, parentMessageId: number, comments: TextMessage[] }
	| { type: ActionType.DeleteComments, parentMessageId: number, messageId: number }
	| { type: ActionType.SetRooms, rooms: Room[] }
	| { type: ActionType.SetRoomPermissions, roomId: number, permissions: RoomPermissions }
	| { type: ActionType.AddRoom, room: Room }
	| { type: ActionType.UpdateRoom, room: Room }
	| { type: ActionType.DeleteRoom, roomId: number }
	| { type: ActionType.SetCurrentDiscussion, roomId: number, discussionMessageId: number | null }
	| { type: ActionType.SetUsers, users: User[] };