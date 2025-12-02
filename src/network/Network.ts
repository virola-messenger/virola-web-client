import { User, Room, TextMessage, RoomPermissions } from "@virola/model";
import Signal from "./Signal";
import Socket from "./Socket";


export class Network {
	#socket: Socket;
	#responseCache: Map<string, Promise<Response>>;
	#isLoggedIn: boolean;

	readonly loggedIn = new Signal<void>();
	readonly loggedOut = new Signal<void>();
	readonly eventReceived = new Signal<MessageEvent>();

	constructor() {
		this.#socket = new Socket();
		this.#responseCache = new Map<string, Promise<Response>>();
		this.#isLoggedIn = false;

		this.#socket.eventReceived.connect((event: MessageEvent) => {
			this.eventReceived.emit(event);
		});
	}

	async checkAuthStatus() {
		const response = await this.get("status");
		if (response.httpStatusCode === 200) {
			this.onAuthenticated();
		} else {
			this.onUnauthorized();
		}
		return response;
	}

	async login(userName: string, password: string) {
		const response = await this.post("login", { userName, password });
		if (response.httpStatusCode === 200) {
			this.onLoggedIn();
		} else {
			this.onUnauthorized();
		}

		return response;
	}

	async logout() {
		const response = await this.post("logout", {});
		if (response.httpStatusCode === 200) {
			this.onLoggedOut();
		} else {
			console.warn("Unable to logout. " + response.errorMessage + " (" + response.httpStatusCode + ")");
			this.onUnauthorized();
		}

		return response;
	}

	async sendMessage(roomId: number, message: string) {
		const response = await this.post("rooms/" + roomId + "/messages", { content: message });
		if (response.httpStatusCode !== 200) {
			console.warn("Unable to send message. " + response.errorMessage + " (" + response.httpStatusCode + ")");
		}
	}

	async sendComment(parentMessageId: number, message: string) {
		const response = await this.post("messages/" + parentMessageId + "/comments", { content: message });
		if (response.httpStatusCode !== 200) {
			console.warn("Unable to send comment. " + response.errorMessage + " (" + response.httpStatusCode + ")");
		}
	}

	async markMessageAsRead(messageId: number) {
		const response = await this.post("messages/" + messageId + "/read", {});
		if (response.httpStatusCode !== 200) {
			console.warn("Unable to mark message as read. " + response.errorMessage + " (" + response.httpStatusCode + ")");
		}
	}

	async deleteMessage(messageId: number) {
		const response = await this.delete("messages/" + messageId);
		if (response.httpStatusCode !== 200) {
			console.warn("Unable to delete message. " + response.errorMessage + " (" + response.httpStatusCode + ")");
		}
		return response;
	}

	 async deleteAttachment(attachmentId: number) {
		const response = await this.delete("attachments/" + attachmentId);
		if (response.httpStatusCode !== 200) {
			console.warn("Unable to delete attachment. " + response.errorMessage + " (" + response.httpStatusCode + ")");
		}
		return response;
	}

	async fetchUsers() : Promise<User[]> {
		const response = await this.get("users");
		switch (response.httpStatusCode) {
			case 200:
				return response.users;

			default:
				return [];
		}
	}

	static userAvatarUrl(userId: number): string {
		return `/api/v1/users/${userId}/avatar.jpg`;
	}

	static roomAvatarUrl(roomId: number): string {
		return `/api/v1/rooms/${roomId}/avatar.jpg`;
	}

	static attachmentUrl(attachmentId: number, fileName: string): string {
		return `/api/v1/attachments/${attachmentId}/${fileName}`;
	}

	async fetchRooms() : Promise<Room[]> {
		const response = await this.get("rooms");
		switch (response.httpStatusCode) {
			case 200:
				return response.rooms;

			default:
				return [];
		}
	}

	async fetchMessages(roomId: number, cursor?: number, limit?: number, direction?: string): Promise<TextMessage[]> {
		let params = new URLSearchParams();
		if (cursor) {
			params.append("cursor", cursor.toString());
		}

		if (limit) {
			params.append("limit", limit.toString());
		}

		if (direction) {
			params.append("direction", direction);
		}

		let queryString = params.toString();
		if (queryString) {
			queryString = "?" + queryString;
		}
		
		const response = await this.get("rooms/" + roomId + "/messages" + queryString);
		switch (response.httpStatusCode) {
			case 200:
				return response.messages;

			default:
				return [];
		}
	}

	async fetchComments(parentMessageId: number, cursor?: number, limit?: number, direction?: string): Promise<TextMessage[]> {
		let params = new URLSearchParams();
		if (cursor) {
			params.append("cursor", cursor.toString());
		}

		if (limit) {
			params.append("limit", limit.toString());
		}

		if (direction) {
			params.append("direction", direction);
		}

		let queryString = params.toString();
		if (queryString) {
			queryString = "?" + queryString;
		}
		
		const response = await this.get("messages/" + parentMessageId + "/comments" + queryString);
		switch (response.httpStatusCode) {
			case 200:
				return response.messages;

			default:
				return [];
		}
	}

	async attachFiles(messageId: number, files: File[]) {
		const formData = new FormData();
		files.forEach(file => {
			formData.append("files", file);
		});

		const request = {
			method: "POST",
			body: formData
		};

		const response = await fetch("api/v1/messages/" + messageId + "/attachments", request);
		if (response.status === 401) {
			this.onUnauthorized();
		}
		return await response.json();
	}

	async fetchRoomPermissions(roomId: number): Promise<{ roomId: number, permissions: RoomPermissions } | null> {
		const response = await this.get("room-permissions/" + roomId);
		switch (response.httpStatusCode) {
			case 200:
				return response.roomPermissions;

			default:
				return null;
		}
	}
	
	private async get(path: string) {	
		const response = await this.cachedFetch("api/v1/" + path);
		if (response.status === 401) {
			this.onUnauthorized();
		}
		return await response.json();
	}
	
	private async post(path: string, json: any) {	
		const request = {
			method: "POST",
			body: JSON.stringify(json),
			headers: {
				"Content-Type": "application/json"
			}
		};
	
		const response = await fetch("api/v1/" + path, request);
		if (response.status === 401) {
			this.onUnauthorized();
		}
		return await response.json();
	}

	private async delete(path: string) {	
		const request = {
			method: "DELETE"
		};

		const response = await fetch("api/v1/" + path, request);
		if (response.status === 401) {
			this.onUnauthorized();
		}

		return await response.json();
	}

	private async cachedFetch(path: string, init?: RequestInit) : Promise<Response> {
		const key = this.responseKey(path, init);

		const cachedResponse = this.#responseCache.get(key); 
		if (cachedResponse) {
			return new Promise((resolve, reject) => {
				cachedResponse
					.then((response) => {
						resolve(response.clone());
					})
					.catch(reject);
			});
		}

		const response = fetch(path, init);
		this.#responseCache.set(key, response);
		response.finally(() => {
			this.#responseCache.delete(key);
		});

		return response;
	}

	private responseKey(path: string, init?: RequestInit) : string {
		let key = path;
		if (init) {
			key = key + JSON.stringify(init);
		}
		return key;
	}

	private onLoggedIn() {
		this.#isLoggedIn = true;
		this.#socket.open();

		this.loggedIn.emit();
	}

	private onLoggedOut() {
		this.#isLoggedIn = false;
		this.#socket.close();
		this.loggedOut.emit();
	}

	private onAuthenticated() {
		if (!this.#isLoggedIn) {
			this.onLoggedIn();
		}
	}

	private onUnauthorized() {
		if (this.#isLoggedIn) {
			this.onLoggedOut();
		}
	}

}
