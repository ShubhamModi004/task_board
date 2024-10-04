"use client";
import {  useCallback, useMemo, useReducer } from "react";
// context
import { TaskContext } from "./Task.context";
//reducers
import { TASK_INITIAL_STATE, taskReducer, Task } from "./Task.reducer";
// actions
import { setTask, clearTask } from "./Task.actions";

type Props = {
  children: React.ReactNode;
};

const TaskProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(taskReducer, TASK_INITIAL_STATE);

  //actions
  const setTaskData = setTask(dispatch);
  const clearTaskData = clearTask(dispatch);

  const handleSaveTask = useCallback(async (task: Task) => {
    setTaskData(task)
  }, [setTaskData]);

  const value = useMemo(
    (): TaskContext => ({
      ...state,
      actions: {
        setTask: ({
          title,
          description,
          status,
          assignee,
          priority,
          tags,
          project,
        }: Task) => {
          handleSaveTask({title, description, status, assignee, priority, tags, project});
        },
        clearTask: () => {
          clearTaskData();
        }
      },
    }),
    [state, handleSaveTask, clearTaskData]
  );

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  )
};

export default TaskProvider;
