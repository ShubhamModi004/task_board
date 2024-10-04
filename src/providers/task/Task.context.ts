import { createContext } from "react";

// types
import { TaskState, Task } from "./Task.reducer";

export interface TaskContext extends TaskState {
  actions: {
    setTask: ({
      title,
      description,
      status,
      assignee,
      priority,
      tags,
      project,
    }: Task) => void;
    clearTask: () => void;
  };
}

export const TaskContext = createContext<TaskContext>({} as TaskContext);
