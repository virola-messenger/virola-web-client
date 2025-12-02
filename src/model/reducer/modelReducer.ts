import { Model, initialModel } from "../Model";
import { TextMessageList } from "../TextMessageList";
import { AuthStatus } from "../AuthStatus";
import { Action, ActionType } from "./Action";
import { RoomPermissions } from "../RoomPermissions";

export function modelReducer(model: Model, action: Action): Model {
	switch (action.type) {

		case ActionType.SetMessages: {
			const messages = new Map(model.messages);
			const roomMessages = new TextMessageList(action.messages);
			messages.set(action.roomId, roomMessages);

			return { ...model, messages: messages };
		}

		case ActionType.AddMessages: {
			const oldRoomMessages = model.messages.get(action.roomId);
			const roomMessages = oldRoomMessages 
				? new TextMessageList(oldRoomMessages.messages) 
				: new TextMessageList();

			roomMessages.addMessages(action.messages);

			const messages = new Map(model.messages);
			messages.set(action.roomId, roomMessages);

			return { ...model, messages: messages };
		}

		case ActionType.UpdateMessages: {
			const oldRoomMessages = model.messages.get(action.roomId);
			const roomMessages = oldRoomMessages 
				? new TextMessageList(oldRoomMessages.messages) 
				: new TextMessageList();

			const updatedCount = roomMessages.updateMessages(action.messages);
			if (updatedCount > 0) {
				const messages = new Map(model.messages);
				messages.set(action.roomId, roomMessages);

				return { ...model, messages: messages };
			} else {
				return model;
			}
		}

		case ActionType.DeleteMessage: {
			let roomMessages = model.messages.get(action.roomId);
			if (roomMessages) {
				roomMessages = new TextMessageList(roomMessages.messages);
				roomMessages.removeMessage(action.messageId);

				const messages = new Map(model.messages);
				messages.set(action.roomId, roomMessages);
				
				return { ...model, messages: messages };
			} else {
				return model;
			}
		}

		case ActionType.SetComments: {
			const comments = new Map(model.comments);
			const messageComments = new TextMessageList(action.comments);
			comments.set(action.parentMessageId, messageComments);

			return { ...model, comments: comments };
		}

		case ActionType.AddComments: {
			const oldMessageComments = model.comments.get(action.parentMessageId);
			const messageComments = oldMessageComments 
				? new TextMessageList(oldMessageComments.messages) 
				: new TextMessageList();

			messageComments.addMessages(action.comments);

			const comments = new Map(model.comments);
			comments.set(action.parentMessageId, messageComments);

			return { ...model, comments: comments };
		}

		case ActionType.UpdateComments: {
			const oldMessageComments = model.comments.get(action.parentMessageId);
			const messageComments = oldMessageComments 
				? new TextMessageList(oldMessageComments.messages) 
				: new TextMessageList();

			messageComments.updateMessages(action.comments);

			const comments = new Map(model.comments);
			comments.set(action.parentMessageId, messageComments);

			return { ...model, comments: comments };
		}

		case ActionType.DeleteComments: {
			let messageComments = model.comments.get(action.parentMessageId);
			if (messageComments) {
				messageComments = new TextMessageList(messageComments.messages);
				messageComments.removeMessage(action.messageId);

				const comments = new Map(model.comments);
				comments.set(action.parentMessageId, messageComments);
				
				return { ...model, comments: comments };
			} else {
				return model;
			}
		}

		case ActionType.SetRooms: {
			return { ...model, rooms: action.rooms };
		}

		case ActionType.AddRoom: {
			const rooms = model.rooms ? [...model.rooms, action.room] : [action.room];
			return { ...model, rooms: rooms };
		}

		case ActionType.UpdateRoom: {
			if (model.rooms) {
				const rooms = model.rooms.map(room => {
					if (room.roomId === action.room.roomId) {
						return { ...action.room, discussionMessageId: room.discussionMessageId };
					}
					return room;
				});

				return { ...model, rooms: rooms };
			} else {
				return model;
			}
		}

		case ActionType.DeleteRoom: {
			if (model.rooms) {
				const rooms = model.rooms.filter(room => room.roomId !== action.roomId);
				return { ...model, rooms: rooms };
			} else {
				return model;
			}
		}

		case ActionType.SetUsers: { 
			return { ...model, users: action.users };
		}

		case ActionType.SetMyUserId: {
			return { ...model, myUserId: action.userId };
		}

		case ActionType.SetAuthStatus: {
			if (action.authStatus === AuthStatus.LoggedIn) {
				return { ...model, authStatus: action.authStatus };
			} else {
				return initialModel(action.authStatus);
			}
		}

		case ActionType.SetCurrentRoom: {
			return { ...model, curentRoomId: action.roomId };
		}

		case ActionType.SetCurrentDiscussion: {
			const rooms = model.rooms?.map(room => {
				if (room.roomId === action.roomId) {
					return { ...room, discussionMessageId: action.discussionMessageId };
				}
				return room;
			}) || null;

			return { ...model, rooms: rooms };
		}

		case ActionType.SetRoomPermissions: {
			return setRoomPermissions(model, action.roomId, action.permissions);
		}
		
		default:
			return model;
	}
}

function setRoomPermissions(model: Model, roomId: number, permissions: RoomPermissions): Model {
	const roomPermissions = new Map(model.roomPermissions);
	roomPermissions.set(roomId, permissions);
	return { ...model, roomPermissions: roomPermissions };
}