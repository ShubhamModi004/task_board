import {  ASSIGNEE, PRIORITY, PROJECT, TASKSTATUS } from "@/types/type";
import { actionTypes, setTaskActionType, clearTaskActionType } from "./Task.actions";

// Define Task interface, which is part of TaskState
export interface Task {
  title: string;
  description: string;
  status: TASKSTATUS;
  assignee?: ASSIGNEE[];
  priority?: PRIORITY;
  tags?: string[];
  project?: PROJECT;  
  createdAt?:string

}

export interface TaskState {
  task: Task;
}

export const TASK_INITIAL_STATE: TaskState = {
  task: {
    title: "",
    description: "",
    status: TASKSTATUS.TODO,
    assignee: undefined,
    priority: undefined,
    tags: undefined,
    project: undefined,
  },
};

type TaskAction = setTaskActionType | clearTaskActionType;

// Reducer: TaskState now contains a single `task` object
export const taskReducer: React.Reducer<TaskState, TaskAction> = (
  prevState = TASK_INITIAL_STATE,
  action
): TaskState => {
  switch (action.type) {
    case actionTypes.SET_TASK:
      return {
        ...prevState,
        task: {
          ...prevState.task,
          ...action.payload, // Merge the new payload into the existing task
        },
      };
    case actionTypes.CLEAR_TASK:
      return {
        ...prevState,
        task: TASK_INITIAL_STATE.task, // Reset to the initial task state
      };
    default:
      return prevState;
  }
};
