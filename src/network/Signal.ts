
export default class Signal<T> {
	#slots: Array<(arg:T)=>void>;

	constructor() {
		this.#slots = [];
	}

	connect(func: (arg:T) => void) {
		this.#slots.push(func);
	}

	disconnect(func: (arg:T) => void) {
		this.#slots = this.#slots.filter(slot => slot !== func);
	}

	emit(arg: T) {
		this.#slots.forEach(slot => slot(arg));
	}

}