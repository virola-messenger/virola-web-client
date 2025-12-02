import React, { useReducer } from "react";
import { modelReducer } from "./reducer/modelReducer";
import { ModelContext } from "./ModelContext";
import { initialModel } from "./Model";

export function ModelProvider({ children } : { children: React.ReactNode }) {
	const reducer = useReducer(modelReducer, initialModel());

	return (
		<ModelContext.Provider value={reducer}>
			{children}
		</ModelContext.Provider>
	);
}