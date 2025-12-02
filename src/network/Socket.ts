import Signal from "./Signal";

export default class Socket {
	#socket: WebSocket | null;
	#reconnectTimeout: number;

	private readonly INITIAL_RECONNECT_TIMEOUT = 1000;
	private readonly MAX_RECONNECT_TIMEOUT = 30000;

	readonly eventReceived = new Signal<MessageEvent>();

	constructor() {
		this.#socket = null;
		this.#reconnectTimeout = this.INITIAL_RECONNECT_TIMEOUT;
	}

	open() {
		if (this.#socket) {
			this.#socket.close();
			this.#socket = null;
		}

		this.#socket = new WebSocket("/api/v1/events");
		this.#socket.onopen = (event: Event) => {
			this.#reconnectTimeout = this.INITIAL_RECONNECT_TIMEOUT;
			
			this.onWebSocketOpen(event);
		}
		this.#socket.onmessage = (event: MessageEvent) => {
			this.onWebSocketMessage(event);
		}
		this.#socket.onerror = (event: Event) => {
			this.onWebSocketError(event);
		}
		this.#socket.onclose = (event: CloseEvent) => {
			this.onWebSocketClose(event);
		}
	}

	close() {
		if (this.#socket) {
			this.#socket.close();
			this.#socket = null;
			this.#reconnectTimeout = this.INITIAL_RECONNECT_TIMEOUT;
		}
	}

	private onWebSocketOpen(event: Event) {
		console.log("WebSocket open: ", event);
	}

	private onWebSocketMessage(event: MessageEvent) {
		console.log("WebSocket message: ", event);

		this.eventReceived.emit(event);
	}

	private onWebSocketError(event: Event) {
		console.error("WebSocket error: ", event);

		if (this.#socket) {
			this.#socket.close();
		}
	}

	private onWebSocketClose(event: CloseEvent) {
		console.log("WebSocket close: ", event);

		if (this.#socket) {
			this.#socket = null;

			this.#reconnectTimeout = Math.min(this.#reconnectTimeout * 2, this.MAX_RECONNECT_TIMEOUT);
			setTimeout(() => {
				this.open();
			}, this.#reconnectTimeout);
		}	
	}
}