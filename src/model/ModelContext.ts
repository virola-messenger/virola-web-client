import { createContext } from "react";
import { Model, initialModel } from "./Model";
import { Action } from "./reducer/Action";

export type ModelContextType = [
	model: Model,
	dispatch: React.ActionDispatch<[action: Action]>
];

export const ModelContext = createContext<ModelContextType>([ initialModel(), () => {} ]);
