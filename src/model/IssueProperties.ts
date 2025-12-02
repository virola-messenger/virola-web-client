export const enum IssueType {
	Task = "Task",
	Subtask = "Subtask",
	Bug = "Bug",
	Epic = "Epic",
	Story = "Story",
	FeatureRequest = "FeatureRequest",
	MergeRequest = "MergeRequest"
}

export const enum IssueStatus {
	Backlog = "Backlog",
	ToDo = "ToDo",
	InProgress = "InProgress",
	ToVerify = "ToVerify",
	Done = "Done",
	Declined = "Declined",
}

export interface IssueProperties {
	type: IssueType;
	status: IssueStatus;
	assignees: number[];
}