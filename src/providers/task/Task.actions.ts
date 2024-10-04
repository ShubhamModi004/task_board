import { Task } from "./Task.reducer";

const base = "Task";

export const actionTypes = {
  SET_TASK: `${base}/SET_TASK`,
  CLEAR_TASK: `${base}/CLEAR_TASK`,
} as const;

export type setTaskActionType = {
  type: typeof actionTypes.SET_TASK;
  payload: Task;
};

export const setTask =
  (dispatch: React.Dispatch<setTaskActionType>) => (payload: Task) => {
    dispatch({
      type: actionTypes.SET_TASK,
      payload: payload,
    });
  };

// description

export type clearTaskActionType = {
  type: typeof actionTypes.CLEAR_TASK;
};

export const clearTask =
  (dispatch: React.Dispatch<clearTaskActionType>) => () => {
    dispatch({
      type: actionTypes.CLEAR_TASK,
    });
  };
