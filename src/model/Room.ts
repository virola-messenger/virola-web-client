export const enum RoomType {
	Private = "Private",
	Public = "Public"
}

export interface LastTextMessage {
	messageId: number
	userId: number
	createdUtc: number
}

export interface Room {
	roomId: number
	displayName: string
	roomType: RoomType
	createdUtc: number
	lastModifiedUtc: number
	unreadMessageCount: number
	isModerator: boolean
	isArchived: boolean
	isPinned: boolean
	lastMessage: LastTextMessage | null
	discussionMessageId: number | null
}
