export interface RoomPermissions {
	canSendMessagesInMainThread: boolean;
	canSendMessagesInDiscussion: boolean;
	canEditOrDeleteOwnMessagesInMainThread: boolean;
	canEditOrDeleteOwnMessagesInDiscussion: boolean;
	canAttachOrDeleteFilesInOwnMessagesInMainThread: boolean;
	canAttachOrDeleteFilesInOwnMessagesInDiscussion: boolean;
	canSendFilesIntoRoomInMainThread: boolean;
	canSendFilesIntoRoomInDiscussion: boolean;
	canReactToTextMessagesWithEmojiInMainThread: boolean;
	canReactToTextMessagesWithEmojiInDiscussion: boolean;
	canChangePropertiesOfUnrelatedIssues: boolean;
	canRecordMeetings: boolean;
	canUseIntercom: boolean;
	canIntercomListen: boolean;
	canIntercomTalk: boolean;
	canIntercomWatchVideo: boolean;
	canIntercomStreamVideo: boolean;
	canShareScreen: boolean;
	canSendNudge: boolean;
	uiCanSeeWhoReadMessagesInMainThread: boolean;
	uiCanSeeWhoReadMessagesInDiscussion: boolean;
	uiCanSeeRoomSidebar: boolean;
	canCreateIssues: boolean;
	canCreateMeetings: boolean;
}

export function allDeniedRoomPermissions(): RoomPermissions {
	return {
		canSendMessagesInMainThread: false,
		canSendMessagesInDiscussion: false,
		canEditOrDeleteOwnMessagesInMainThread: false,
		canEditOrDeleteOwnMessagesInDiscussion: false,
		canAttachOrDeleteFilesInOwnMessagesInMainThread: false,
		canAttachOrDeleteFilesInOwnMessagesInDiscussion: false,
		canSendFilesIntoRoomInMainThread: false,
		canSendFilesIntoRoomInDiscussion: false,
		canReactToTextMessagesWithEmojiInMainThread: false,
		canReactToTextMessagesWithEmojiInDiscussion: false,
		canChangePropertiesOfUnrelatedIssues: false,
		canRecordMeetings: false,
		canUseIntercom: false,
		canIntercomListen: false,
		canIntercomTalk: false,
		canIntercomWatchVideo: false,
		canIntercomStreamVideo: false,
		canShareScreen: false,
		canSendNudge: false,
		uiCanSeeWhoReadMessagesInMainThread: false,
		uiCanSeeWhoReadMessagesInDiscussion: false,
		uiCanSeeRoomSidebar: false,
		canCreateIssues: false,
		canCreateMeetings: false
	};
}

export function allGrantedRoomPermissions(): RoomPermissions {
	return {
		canSendMessagesInMainThread: true,
		canSendMessagesInDiscussion: true,
		canEditOrDeleteOwnMessagesInMainThread: true,
		canEditOrDeleteOwnMessagesInDiscussion: true,
		canAttachOrDeleteFilesInOwnMessagesInMainThread: true,
		canAttachOrDeleteFilesInOwnMessagesInDiscussion: true,
		canSendFilesIntoRoomInMainThread: true,
		canSendFilesIntoRoomInDiscussion: true,
		canReactToTextMessagesWithEmojiInMainThread: true,
		canReactToTextMessagesWithEmojiInDiscussion: true,
		canChangePropertiesOfUnrelatedIssues: true,
		canRecordMeetings: true,
		canUseIntercom: true,
		canIntercomListen: true,
		canIntercomTalk: true,
		canIntercomWatchVideo: true,
		canIntercomStreamVideo: true,
		canShareScreen: true,
		canSendNudge: true,
		uiCanSeeWhoReadMessagesInMainThread: true,
		uiCanSeeWhoReadMessagesInDiscussion: true,
		uiCanSeeRoomSidebar: true,
		canCreateIssues: true,
		canCreateMeetings: true
	};
}

