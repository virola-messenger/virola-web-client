export interface Size {
	width: number;
	height: number;
}

export interface Attachment {
	attachmentId: number
	attachmentState: string
	createdUtc: number
	fileChecksum: string
	fileName: string
	fileSize: number
	hasThumbnail: boolean
	lastModifiedUtc: number
	roomId: number
	textMessageId: number
	size?: Size
}