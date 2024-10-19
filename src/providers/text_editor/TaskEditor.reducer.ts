import { ASSIGNEE, PRIORITY, PROJECT, TASKSTATUS } from "@/types/type";
import {
  actionTypes,
  setTitleActionType,
  setDescriptionActionType,
  setStatusActionType,
  setAssigneeActionType,
  setPriorityActionType,
  setTagsActionType,
  deleteTagsActionType,
  setProjectActionType,
} from "./TaskEditor.actions";

export interface TaskEditorState {
  title: string;
  description: string;
  status: TASKSTATUS;
  assignee?: ASSIGNEE[];
  priority?: PRIORITY;
  tags?: string[];
  project?: PROJECT;
}

export const TASK_INITIAL_STATE: TaskEditorState = {
  title: "Task title",
  description: "Describe this task",
  status: TASKSTATUS.TODO,
  assignee: undefined,
  priority: undefined,
  tags: undefined,
  project: undefined,
} as unknown as TaskEditorState;

type TaskEditorAction =
  | setTitleActionType
  | setDescriptionActionType
  | setStatusActionType
  | setAssigneeActionType
  | setPriorityActionType
  | setTagsActionType
  | setProjectActionType
  | deleteTagsActionType;

export const taskReducer: React.Reducer<TaskEditorState, TaskEditorAction> = (
  prevState = TASK_INITIAL_STATE,
  action
): TaskEditorState => {
  switch (action.type) {
    case actionTypes.SET_TITLE:
      return {
        ...prevState,
        ...action.payload,
      };
    case actionTypes.SET_DESCRIPTION:
      return {
        ...prevState,
        ...action.payload,
      };
    case actionTypes.SET_STATUS:
      return {
        ...prevState,
        ...action.payload,
      };
    case actionTypes.SET_ASSIGNEE:
      return {
        ...prevState,
        ...action.payload,
      };
    case actionTypes.SET_PRIORITY:
      return {
        ...prevState,
        ...action.payload,
      };
    case actionTypes.SET_TAGS:
      return {
        ...prevState,
        tags: [...(prevState.tags || []), action.payload], // Append new tag
      };
    case actionTypes.DELETE_TAGS:
      return {
        ...prevState,
        tags: prevState.tags?.filter(tag => tag !== action.payload), // Remove the matching tag
      };
    case actionTypes.SET_PROJECT:
      return {
        ...prevState,
        ...action.payload,
      };

    default:
      return prevState;
  }
};
