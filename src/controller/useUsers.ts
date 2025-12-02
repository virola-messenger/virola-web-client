import { useEffect } from "react";
import { ActionType, User, useModel } from "@virola/model";
import { useNetwork } from "@virola/network";

export function useUsers(): User[] {
	const network = useNetwork();
	const [ model, dispatch ] = useModel();
	const users = model.users

	useEffect(() => {
			let ignore = false;

			if (users == null) {
				network.fetchUsers().then(users => {
					if (!ignore) {
						setUsers(users);
					}
					return users;
				});
			}
	
			return () => { 
				ignore = true; 
			}
		}
		, []
	);	

	function setUsers(users: User[]) {
		dispatch({ type: ActionType.SetUsers, users });
	}

	return users || [];
}

export function useUser(userId: number): User | null {
	const users = useUsers();
	const user = users.find(user => user.userId === userId);
	return user || null;
}

export function useMyUserId(): number | null {
	const [ model ] = useModel();
	return model.myUserId || null;
}

export function useMyUser(): User | null {
	const myUserId = useMyUserId();
	if (myUserId) {
		return useUser(myUserId);
	} else {
		return null;
	}
}