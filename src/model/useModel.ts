import { useContext } from "react";
import { ModelContext } from "./ModelContext";

export function useModel() {
	return useContext(ModelContext);
}

export function useModelDispatch() {
	const [_, dispatch] = useModel();
	return dispatch;
}
