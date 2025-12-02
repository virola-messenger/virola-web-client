export const enum UserStatus {
	Active = "Active",
	Suspended = "Suspended",
	DeletionInProgress = "DeletionInProgress"
}

export interface User {
	userId: number;
	userName: string;
	displayName: string;
	status: UserStatus;
	isAdmin: boolean;
	createdUtc: number;
	lastModifiedUtc: number;
}
