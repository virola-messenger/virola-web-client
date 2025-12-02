import { TextMessage } from "./TextMessage";

export class TextMessageList {
	#messages: TextMessage[] = [];

	constructor(messages: TextMessage[] = []) {
		this.#messages = [...messages];
	}

	get messages(): TextMessage[] {
		return this.#messages;
	}

	findMessageById(messageId: number): TextMessage | null {
		const index = this.lowerBoundIndex(messageId);
		if (index < this.#messages.length) {
			const message = this.#messages[index];
			if (message.messageId === messageId) {
				return message;
			}
		}
		return null;
	}

	addMessage(message: TextMessage): void {
		const index = this.lowerBoundIndex(message.messageId);
		if (index < this.#messages.length && this.#messages[index].messageId === message.messageId) {
			this.#messages[index] = message;
		} else {
			this.#messages.splice(index, 0, message);
		}
	}

	updateMessage(message: TextMessage): boolean {
		const index = this.lowerBoundIndex(message.messageId);
		if (index < this.#messages.length && this.#messages[index].messageId === message.messageId) {
			this.#messages[index] = message;
			return true;
		}
		return false;
	}

	addMessages(newMessages: TextMessage[]): void {
		for (const message of newMessages) {
			this.addMessage(message);
		}
	}

	updateMessages(updatedMessages: TextMessage[]): number {
		let updatedCount = 0;
		for (const message of updatedMessages) {
			if (this.updateMessage(message)) {
				updatedCount++;
			}
		}
		return updatedCount;
	}

	removeMessage(messageId: number): void {
		const index = this.lowerBoundIndex(messageId);
		if (index < this.#messages.length && this.#messages[index].messageId === messageId) {
			this.#messages.splice(index, 1);
		}
	}

	private lowerBoundIndex(messageId: number): number {
		let low = 0;
		let high = this.#messages.length - 1;

		while (low <= high) {
			const mid = Math.floor((low + high) / 2);
			if (this.#messages[mid].messageId < messageId) {
				low = mid + 1;
			} else {
				high = mid - 1;
			}
		}
		return low;
	}
}
