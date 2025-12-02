import { Attachment } from './Attachment';
import { IssueProperties } from './IssueProperties';
import { MeetingProperties } from './MeetingProperties';

export const enum MarkupType {
	TextPlain = "TextPlain",
	TextHtml = "TextHtml",
	TextMarkdown = "TextMarkdown",
	TextCode = "TextCode",
	TextLatex = "TextLatex"
}

export const enum MessageType {
	Regular	= "Regular",
	Issue = "Issue",
	Meeting = "Meeting"
}

export const enum MessagePriority {
	Blocker = "Blocker",
	Critical = "Critical",
	High = "High",
	Normal = "Normal",
	Low = "Low",
	Trivial = "Trivial"
}

export interface ReadTimestamp {
	userId: number;
	readUtc: number;
}

export interface TextMessage {
	messageId: number;
	userId: number;
	roomId: number;
	parentMessageId: number;
	text: string;
	messageType: MessageType;
	priority: MessagePriority;
	markupType: MarkupType;
	createdUtc: number;
	lastEditedUtc: number;
	lastModifiedUtc: number;
	attachments: Attachment[];
	commentCount: number;
	readTimestamps: ReadTimestamp[];
	issueProperties?: IssueProperties;
	meetingProperties?: MeetingProperties;
}
