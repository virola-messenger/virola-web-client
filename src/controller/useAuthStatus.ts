import { useEffect } from "react";
import { useNetwork } from "@virola/network";
import { ActionType, useModel } from "@virola/model";
import { AuthStatus } from "@virola/model";

export function useAuthStatus() {
	const network = useNetwork();
	const [ model, dispatch ] = useModel();

	useEffect(() => {
			network.loggedIn.connect(onLogin);
			network.loggedOut.connect(onLogout);

			if (model.authStatus === AuthStatus.Unknown) {
				network.checkAuthStatus().then( response => {
					if (response.httpStatusCode === 200) {
						const userId = response.userId as number;
						dispatch({ type: ActionType.SetMyUserId, userId });
					} else {
						dispatch({ type: ActionType.SetAuthStatus, authStatus: AuthStatus.LoggedOut });
					}
				});
			}
	
			return () => { 
				network.loggedIn.disconnect(onLogin);
				network.loggedOut.disconnect(onLogout);
			}
		}
		, []
	);

	function onLogin() {
		setAuthStatus(AuthStatus.LoggedIn);
	}

	function onLogout() {
		setAuthStatus(AuthStatus.LoggedOut);
	}

	function setAuthStatus(authStatus: AuthStatus) {
		dispatch({ type: ActionType.SetAuthStatus, authStatus });	
	}

	return model.authStatus;
}