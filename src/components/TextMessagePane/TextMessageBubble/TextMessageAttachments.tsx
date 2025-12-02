import React, { MouseEvent } from "react";
import { Attachment } from "@virola/model";
import styles from "./TextMessageAttachments.module.scss";

import PaperClip from "@virola/assets/images/paper-clip.svg?react";
import { Network } from "@virola/network";

type TextMessageAttachmentsProps = {
	attachments: Attachment[];
	onContextMenu: (x: number, y: number, attachmentId: number) => void;
}

export default function TextMessageAttachments({ attachments, onContextMenu }: TextMessageAttachmentsProps) {
	if (attachments.length > 0) {
		return (
			<div className={ styles.attachments }>
				{ attachments.map( (attachment) => (
					<TextMessageAttachment key={ attachment.attachmentId } attachment={ attachment } onContextMenu={ onContextMenu } />
				)) }
			</div>
		)
	} else {
		return <></>;
	}
}

type TextMessageAttachmentProps = {
	attachment: Attachment;
	onContextMenu: (x: number, y: number, attachmentId: number) => void;
}

function TextMessageAttachment({ attachment, onContextMenu }: TextMessageAttachmentProps) {
	const url = formatUrl(attachment);

	function onContextMenuRequested(event: MouseEvent<HTMLDivElement>) {
		event.preventDefault();
		event.stopPropagation();

		if (onContextMenu) {
			onContextMenu(event.clientX, event.clientY, attachment.attachmentId);
		}
	}

	return (
		<div className={ styles.attachment } onContextMenu={ onContextMenuRequested }>
			<AttachmentPreview attachment={ attachment }/>
			<div className={ styles.attachmentLink }>
				<a href={ url }>
					<PaperClip className={ styles.icon }/>
				</a>
				<div>
					<a href={ url }>{attachment.fileName}</a>
					<div>{ formatFileSize(attachment.fileSize) }</div>
				</div>
			</div>
		</div>
	);
}

function AttachmentPreview({ attachment }: { attachment: Attachment }) {
	
	const url = formatUrl(attachment);

	if (showImage(attachment)) {
		return <img className={ styles.image } src={ url } alt={ attachment.fileName } />;
	} else if (isVideo(attachment.fileName)) {
		return <video className={ styles.video } controls src={ url } />;
	} else if (isAudio(attachment.fileName)) {
		return <audio className={ styles.audio } controls src={ url } />;
	} else {
		return <></>;
	}
}

function formatUrl(attachment: Attachment) {
	return Network.attachmentUrl(attachment.attachmentId, attachment.fileName);
}

function formatFileSize(size: number) { 
	const units = ["B", "KB", "MB", "GB"];
	let unitIndex = 0;
	while (size >= 1024 && unitIndex < units.length - 1) {
		size /= 1024;
		unitIndex++;
	}
	return size.toFixed(2) + " " + units[unitIndex];
}

function showImage(attachment: Attachment): boolean {
	return isImage(attachment.fileName) && attachment.fileSize < 5 * 1024 * 1024; // 5MB limit for inline images
}

function isImage(fileName: string): boolean {
	const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg', '.tiff'];
	const lowerFileName = fileName.toLowerCase();

	return imageExtensions.some(ext => lowerFileName.endsWith(ext));
}

function isVideo(fileName: string): boolean {
	const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv', '.flv', '.wmv'];
	const lowerFileName = fileName.toLowerCase();

	return videoExtensions.some(ext => lowerFileName.endsWith(ext));
}

function isAudio(fileName: string): boolean {
	const audioExtensions = ['.mp3', '.wav', '.ogg', '.flac', '.aac'];
	const lowerFileName = fileName.toLowerCase();

	return audioExtensions.some(ext => lowerFileName.endsWith(ext));
}
  