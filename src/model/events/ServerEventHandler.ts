import { ServerEvent, ServerEvents } from "./ServerEvent";
import { ActionType, TextMessage } from "@virola/model";

export class ServerEventHandler {
	private dispatch: React.Dispatch<any>;

	constructor(dispatch: React.Dispatch<any>) {
		this.dispatch = dispatch;
	}

	onNetworkEvent(event: MessageEvent): void {
		const serverEvent: ServerEvent = JSON.parse(event.data);
		this.handleEvent(serverEvent);
	}

	private handleEvent(event: ServerEvent): void {
		switch (event.type) {
			case ServerEvents.TextMessagesCreated:
				this.handleTextMessagesCreated(event.data);
				break;
			case ServerEvents.TextMessagesUpdated:
				this.handleTextMessagesUpdated(event.data);
				break;
			case ServerEvents.TextMessageDeleted:
				this.handleTextMessageDeleted(event.data);
				break;
			case ServerEvents.RoomCreated:
				this.handleRoomCreated(event.data);
				break;
			case ServerEvents.RoomUpdated:
				this.handleRoomUpdated(event.data);
				break;
			case ServerEvents.RoomDeleted:
				this.handleRoomDeleted(event.data);
				break;
			default:
				console.warn(`Unhandled server event type: ${event.type}`);
		}
	}

	private handleTextMessagesCreated(data: any): void {
		for (const jsonMessage of data.messages) {
			const message: TextMessage = jsonMessage as TextMessage;
			if (message) {
				if (message.parentMessageId === 0) {
					this.dispatch({ type: ActionType.AddMessages, roomId: message.roomId, messages: [ message ] });
				} else {
					this.dispatch({ type: ActionType.AddComments, parentMessageId: message.parentMessageId, comments: [ message ] });
				}
			}
		}
	}

	private handleTextMessagesUpdated(data: any): void {
		for (const jsonMessage of data.messages) {
			const message: TextMessage = jsonMessage as TextMessage;
			if (message) {
				if (message.parentMessageId === 0) {
					this.dispatch({ type: ActionType.UpdateMessages, roomId: message.roomId, messages: [ message ] });
				} else {
					this.dispatch({ type: ActionType.UpdateComments, parentMessageId: message.parentMessageId, comments: [ message ] });
				}
			}
		}
	}

	private handleTextMessageDeleted(data: any): void {
		if (data.parentMessageId === 0) {
			this.dispatch({ type: ActionType.DeleteMessage, roomId: data.roomId, messageId: data.messageId });
		} else {
			this.dispatch({ type: ActionType.DeleteComments, parentMessageId: data.parentMessageId, messageId: data.messageId });
		}
	}

	private handleRoomCreated(data: any): void {
		this.dispatch({ type: ActionType.AddRoom, room: data.room });
	}

	private handleRoomUpdated(data: any): void {
		this.dispatch({ type: ActionType.UpdateRoom, room: data.room });
	}

	private handleRoomDeleted(data: any): void {
		this.dispatch({ type: ActionType.DeleteRoom, roomId: data.roomId });
	}
}