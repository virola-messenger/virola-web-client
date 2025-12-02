import { useCallback, useEffect, useRef } from "react";
import { TextMessage } from '@virola/model';
import { Network } from '@virola/network';

export default function useVisibleMessageReader(messages: TextMessage[], network: Network, myUserId: number) {

	function isUnread(messageId: number): boolean {
		const message = messages.find(msg => msg.messageId === messageId);
		if (message) {
			const timestamp = message.readTimestamps.find(readTimestamp => readTimestamp.userId === myUserId);
			if (!timestamp) {
				return true;
			}
		}
		return false;
	};

	var visibleMessages = new Map<number, Date>();
	const readVisibleMessages = useCallback(() => {
		const now = new Date();
		visibleMessages.forEach((date, messageId) => {
			const timeSinceLastRead = now.getTime() - date.getTime();
			if (timeSinceLastRead < 1000) {
				return;
			}

			if (isUnread(messageId)) {
				network.markMessageAsRead(messageId).catch(error => {
					console.error("Failed to mark message as read:", error);
				});

				visibleMessages.delete(messageId);
			}
		});
	}, [messages]);

	useEffect(() => {
		let interval = setInterval(() => {
			readVisibleMessages();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [messages]);

	const onItemVisible = useCallback((element: HTMLDivElement) => {
		const messageId = parseInt(element.dataset.messageId || "0", 10);
		if (isNaN(messageId)) {
			return;
		}

		if (!visibleMessages.has(messageId)) {
			if (isUnread(messageId)) {
				visibleMessages.set(messageId, new Date());
			}
		}
	}, [messages]);

	const onItemHidden = useCallback((element: HTMLDivElement) => {
		const messageId = parseInt(element.dataset.messageId || "0", 10);
		if (isNaN(messageId)) {
			return;
		}

		if (visibleMessages.has(messageId)) {
			visibleMessages.delete(messageId);
		}
	}, [messages]);

	return useIntersectionObserver(onItemVisible, onItemHidden);
}


function useIntersectionObserver(onVisible?: (element: HTMLDivElement) => void, onHidden?: (element: HTMLDivElement) => void) : [React.RefObject<HTMLDivElement | null>, (element: HTMLDivElement) => void] {
	const rootRef = useRef<HTMLDivElement | null>(null);
	
	const onItemCreated = useCallback((element: HTMLDivElement) => {
		var observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					if (onVisible) {
						onVisible(entry.target as HTMLDivElement);
					}
				} else {
					if (onHidden) {
						onHidden(entry.target as HTMLDivElement);
					}
				}
			});
		},
		{
			root: rootRef.current,
			threshold: 0.5
		});

		observer.observe(element);

		return () => {
			observer.unobserve(element);
		};
	}, [onVisible, onHidden]);

	return [ rootRef, onItemCreated ];
}
