import { TaskEditorState } from "./TaskEditor.reducer";

const base = "App";

export const actionTypes = {
  SET_TITLE: `${base}/SET_TITLE`,
  SET_DESCRIPTION: `${base}/SET_DESCRIPTION`,
  SET_STATUS: `${base}/SET_STATUS`,
  SET_ASSIGNEE: `${base}/SET_ASSIGNEE`,
  SET_PRIORITY: `${base}/SET_PRIORITY`,
  SET_TAGS: `${base}/SET_TAGS`,
  DELETE_TAGS: `${base}/DELETE_TAGS`,
  SET_PROJECT: `${base}/SET_PROJECT`,
} as const;

export type setTitleActionType = {
  type: typeof actionTypes.SET_TITLE;
  payload: Pick<TaskEditorState, "title">;
};

// title

export const setTitle =
  (dispatch: React.Dispatch<setTitleActionType>) =>
  (payload: TaskEditorState["title"]) => {
    dispatch({
      type: actionTypes.SET_TITLE,
      payload: { title: payload },
    });
  };

export type setDescriptionActionType = {
  type: typeof actionTypes.SET_DESCRIPTION;
  payload: Pick<TaskEditorState, "description">;
};

// description

export const setDescription =
  (dispatch: React.Dispatch<setDescriptionActionType>) =>
  (payload: TaskEditorState["description"]) => {
    dispatch({
      type: actionTypes.SET_DESCRIPTION,
      payload: { description: payload },
    });
  };

// status

export type setStatusActionType = {
  type: typeof actionTypes.SET_STATUS;
  payload: Pick<TaskEditorState, "status">;
};

export const setStatus =
  (dispatch: React.Dispatch<setStatusActionType>) =>
  (payload: TaskEditorState["status"]) => {
    dispatch({
      type: actionTypes.SET_STATUS,
      payload: { status: payload },
    });
  };

// assignee

export type setAssigneeActionType = {
  type: typeof actionTypes.SET_ASSIGNEE;
  payload: Pick<TaskEditorState, "assignee">;
};

export const setAssignee =
  (dispatch: React.Dispatch<setAssigneeActionType>) =>
  (payload: TaskEditorState["assignee"]) => {
    dispatch({
      type: actionTypes.SET_ASSIGNEE,
      payload: { assignee: payload },
    });
  };

// priority

export type setPriorityActionType = {
  type: typeof actionTypes.SET_PRIORITY;
  payload: Pick<TaskEditorState, "priority">;
};

export const setPriority =
  (dispatch: React.Dispatch<setPriorityActionType>) =>
  (payload: TaskEditorState["priority"]) => {
    dispatch({
      type: actionTypes.SET_PRIORITY,
      payload: { priority: payload },
    });
  };


// tags

export type setTagsActionType = {
  type: typeof actionTypes.SET_TAGS;
  payload: string;
};

export const setTags =
  (dispatch: React.Dispatch<setTagsActionType>) =>
  (payload: string) => {
    dispatch({
      type: actionTypes.SET_TAGS,
      payload: payload,
    });
  };


  // Delete tags

export type deleteTagsActionType = {
  type: typeof actionTypes.DELETE_TAGS;
  payload: string;
};

export const deleteTags =
  (dispatch: React.Dispatch<deleteTagsActionType>) =>
  (payload: string) => {
    dispatch({
      type: actionTypes.DELETE_TAGS,
      payload: payload,
    });
  };


// project

export type setProjectActionType = {
  type: typeof actionTypes.SET_PROJECT;
  payload: Pick<TaskEditorState, "project">;
};

export const setProject =
  (dispatch: React.Dispatch<setProjectActionType>) =>
  (payload: TaskEditorState["project"]) => {
    dispatch({
      type: actionTypes.SET_PROJECT,
      payload: { project: payload },
    });
  };
