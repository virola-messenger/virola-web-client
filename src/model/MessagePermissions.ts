export interface MessagePermissions {
	canEdit: boolean;
	canDelete: boolean;
	canAttachFiles: boolean;
	canDeleteAttachedFiles: boolean;
	canReactWithEmoji: boolean;
	canSeeWhoRead: boolean;
}

export function allDeniedMessagePermissions(): MessagePermissions {
	return {
		canEdit: false,
		canDelete: false,
		canAttachFiles: false,
		canDeleteAttachedFiles: false,
		canReactWithEmoji: false,
		canSeeWhoRead: false
	};
}

export function allGrantedMessagePermissions(): MessagePermissions {
	return {
		canEdit: true,
		canDelete: true,
		canAttachFiles: true,
		canDeleteAttachedFiles: true,
		canReactWithEmoji: true,
		canSeeWhoRead: true
	};
}