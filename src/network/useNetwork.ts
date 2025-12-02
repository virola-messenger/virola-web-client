import { useContext } from "react";
import { NetworkContext } from "./NetworkContext";

export function useNetwork() {
	return useContext(NetworkContext);
}