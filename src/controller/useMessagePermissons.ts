import { allDeniedMessagePermissions, allGrantedMessagePermissions, MessagePermissions } from "@virola/model";
import { useMessage } from "./useMessages";
import { useMyUser } from "./useUsers";
import { useRoom } from "./useRooms";
import { useRoomPermissions } from "./useRoomPermissions";

export function useMessagePermissions(messageId: number): MessagePermissions {
	const message = useMessage(messageId);
	if (!message) {
		return allDeniedMessagePermissions();
	}

	const myUser = useMyUser();
	if (!myUser) {
		return allDeniedMessagePermissions();
	}

	if (myUser.isAdmin) {
		return allGrantedMessagePermissions();
	}

	const room = useRoom(message.roomId);
	if (!room) {
		return allDeniedMessagePermissions();
	}

	if (room.isModerator) {
		return allGrantedMessagePermissions();
	}

	if (message.userId != myUser.userId) {
		return allDeniedMessagePermissions();
	}

	const roomPermissions = useRoomPermissions(message.roomId);
	if (!roomPermissions) {
		return allDeniedMessagePermissions();
	}

	const isInDiscussion = message.parentMessageId > 0;
	if (isInDiscussion) {
		return {
			canDelete: roomPermissions.canEditOrDeleteOwnMessagesInDiscussion,
			canEdit: roomPermissions.canEditOrDeleteOwnMessagesInDiscussion,
			canAttachFiles: roomPermissions.canAttachOrDeleteFilesInOwnMessagesInDiscussion,
			canDeleteAttachedFiles: roomPermissions.canAttachOrDeleteFilesInOwnMessagesInDiscussion,
			canReactWithEmoji: roomPermissions.canReactToTextMessagesWithEmojiInDiscussion,
			canSeeWhoRead: roomPermissions.uiCanSeeWhoReadMessagesInDiscussion
		};
	} else {
		return {
			canDelete: roomPermissions.canEditOrDeleteOwnMessagesInMainThread,
			canEdit: roomPermissions.canEditOrDeleteOwnMessagesInMainThread,
			canAttachFiles: roomPermissions.canAttachOrDeleteFilesInOwnMessagesInMainThread,
			canDeleteAttachedFiles: roomPermissions.canAttachOrDeleteFilesInOwnMessagesInMainThread,
			canReactWithEmoji: roomPermissions.canReactToTextMessagesWithEmojiInMainThread,
			canSeeWhoRead: roomPermissions.uiCanSeeWhoReadMessagesInMainThread
		};
	}
}
