import { useEffect } from "react";
import { ActionType, TextMessage, useModel } from "@virola/model";
import { useNetwork } from "@virola/network";


export function useMessages(roomId: number): TextMessage[] {
	const network = useNetwork();
	const [ model, dispatch ] = useModel();
	const messageList = model.messages.get(roomId);

	useEffect(() => {
			const minMessageCount = 100;
			let ignore = false;

			if (messageList == null || messageList.messages.length < minMessageCount) {
				network.fetchMessages(roomId, -1, minMessageCount, "backward").then(messages => {
					if (!ignore) {
						dispatch({ type: ActionType.SetMessages, roomId, messages });
					}
				});
			}
	 
			return () => {  
				ignore = true; 
			}
		}
		, [roomId]
	);	

	if (messageList) {
		return messageList.messages;
	} else {
		return [];
	}
}

export function useMessage(messageId: number): TextMessage | null {
	const [ model ] = useModel();

	for (const messages of model.messages.values()) {
		const message = messages.findMessageById(messageId);
		if (message) {
			return message;
		}
	}

	for (const comments of model.comments.values()) {
		const message = comments.findMessageById(messageId);
		if (message) {
			return message;
		}
	}

	return null;
}