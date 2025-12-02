import { useEffect } from "react";
import { ActionType, TextMessage, useModel } from "@virola/model";
import { ServerEvents, ServerEvent } from "@virola/model";
import { useNetwork } from "@virola/network";


export function useComments(parentMessageId: number): TextMessage[] {
	const network = useNetwork();
	const [ model, dispatch ] = useModel();
	const commentList = model.comments.get(parentMessageId);

	useEffect(() => {
			let ignore = false;

			if (commentList == null) {
				network.fetchComments(parentMessageId, -1, 100, "backward").then(comments => {
					if (!ignore) {
						dispatch({ type: ActionType.SetComments, parentMessageId, comments });
					}
				});
			}
	 
			return () => {  
				ignore = true; 
			}
		}
		, [parentMessageId]
	);	

	if (commentList) {
		return commentList.messages;
	} else {
		return [];
	}
}
