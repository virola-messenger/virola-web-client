export enum ServerEvents {
	TextMessagesCreated = "TextMessagesCreated",
	TextMessagesUpdated = "TextMessagesUpdated",
	TextMessageDeleted = "TextMessageDeleted",
	RoomCreated = "RoomCreated",
	RoomUpdated = "RoomUpdated",
	RoomDeleted = "RoomDeleted"
}

export interface ServerEvent {
	type: ServerEvents;
	data: any;
}