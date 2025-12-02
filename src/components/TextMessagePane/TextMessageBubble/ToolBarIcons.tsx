import React from "react";
import { IssueStatus, IssueType, MessagePriority } from '@virola/model';

import styles from './ToolBarIcons.module.scss';

// Priority icons
import Blocker from "@virola/assets/images/text-message/priority/blocker.svg?react";
import Critical from "@virola/assets/images/text-message/priority/critical.svg?react";
import High from "@virola/assets/images/text-message/priority/high.svg?react";
import Normal from "@virola/assets/images/text-message/priority/normal.svg?react";
import Low from "@virola/assets/images/text-message/priority/low.svg?react";
import Trivial from "@virola/assets/images/text-message/priority/trivial.svg?react";

// Issue type icons
import Task from "@virola/assets/images/text-message/issue/type/task.svg?react";
import Subtask from "@virola/assets/images/text-message/issue/type/subtask.svg?react";
import Bug from "@virola/assets/images/text-message/issue/type/bug.svg?react";
import Epic from "@virola/assets/images/text-message/issue/type/epic.svg?react";
import Story from "@virola/assets/images/text-message/issue/type/story.svg?react";
import FeatureRequest from "@virola/assets/images/text-message/issue/type/feature-request.svg?react";
import MergeRequest from "@virola/assets/images/text-message/issue/type/merge-request.svg?react";

// Issue status icons
import Backlog from "@virola/assets/images/text-message/issue/status/backlog.svg?react";
import ToDo from "@virola/assets/images/text-message/issue/status/todo.svg?react";
import InProgress from "@virola/assets/images/text-message/issue/status/in-progress.svg?react";
import ToVerify from "@virola/assets/images/text-message/issue/status/to-verify.svg?react";
import Done from "@virola/assets/images/text-message/issue/status/done.svg?react";
import Declined from "@virola/assets/images/text-message/issue/status/declined.svg?react";

export function MessagePriorityIcon({ priority }: { priority: MessagePriority }) {
	switch (priority) {
		case MessagePriority.Blocker:
			return <Blocker className = { styles.icon } />;
		case MessagePriority.Critical:
			return <Critical className = { styles.icon } />;
		case MessagePriority.High:
			return <High className = { styles.icon } />;
		case MessagePriority.Normal:
			return <Normal className = { styles.icon } />;
		case MessagePriority.Low:
			return <Low className = { styles.icon } />;
		case MessagePriority.Trivial:
			return <Trivial className = { styles.icon } />;
		default:
			return <></>;
	}
}

export function IssueTypeIcon({type}: { type: IssueType }) {
	switch (type) {
		case IssueType.Task:
			return <Task className = { styles.icon } />;
		case IssueType.Subtask:
			return <Subtask className = { styles.icon } />;
		case IssueType.Bug:
			return <Bug className = { styles.icon } />;
		case IssueType.Epic:
			return <Epic className = { styles.icon } />;
		case IssueType.Story:
			return <Story className = { styles.icon } />;
		case IssueType.FeatureRequest:
			return <FeatureRequest className = { styles.icon } />;
		case IssueType.MergeRequest:
			return <MergeRequest className = { styles.icon } />;
		default:
			return <></>;
	}
}

export function IssueStatusIcon({ status }: { status: IssueStatus }) {
	switch (status) {
		case IssueStatus.Backlog:
			return <Backlog className = { styles.icon } />;
		case IssueStatus.ToDo:
			return <ToDo className = { styles.icon } />;
		case IssueStatus.InProgress:
			return <InProgress className = { styles.icon } />;
		case IssueStatus.ToVerify:
			return <ToVerify className = { styles.icon } />;
		case IssueStatus.Done:
			return <Done className = { styles.icon } />;
		case IssueStatus.Declined:
			return <Declined className = { styles.icon } />;
		default:
			return <></>;
	}
}