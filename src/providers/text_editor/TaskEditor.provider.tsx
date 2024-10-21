"use client";
import { useCallback, useMemo, useReducer, useState } from "react";
// context
import { TaskEditorContext } from "./TaskEditor.context";
//reducers
import { TASK_INITIAL_STATE, taskReducer } from "./TaskEditor.reducer";
// actions
import {
  setTitle,
  setDescription,
  setStatus,
  setAssignee,
  setPriority,
  setTags,
  setProject,
  deleteTags,
} from "./TaskEditor.actions";

// task editor imports
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import Bold from "@tiptap/extension-bold";
import { Heading } from "@tiptap/extension-heading";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { ASSIGNEE, PRIORITY, PROJECT, TASKSTATUS } from "@/types/type";
import { useRouter } from "next/navigation";
import { useTagGenerator } from "@/hooks/useTagGenerator";

type Props = {
  children: React.ReactNode;
};

const TaskEditorProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(taskReducer, TASK_INITIAL_STATE);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Typography,
      Heading,
      TaskList,
      TaskItem,
      Bold,
      Italic,
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content: "<p>Describe this task</p>",
  });

  //actions
  const setTaskTitle = setTitle(dispatch);
  const setTaskDescription = setDescription(dispatch);
  const setTaskStatus = setStatus(dispatch);
  const setTaskAssignee = setAssignee(dispatch);
  const setTaskPriority = setPriority(dispatch);
  const setTaskTags = setTags(dispatch);
  const setTaskProject = setProject(dispatch);
  const deleteTaskTags = deleteTags(dispatch);

  const handleSaveTask = useCallback(
    async (
      title: string,
      status: TASKSTATUS,
      assignee?: ASSIGNEE[],
      priority?: PRIORITY,
      tags?: string[],
      project?: PROJECT
    ) => {
      if (editor) {
        setLoading(true);
        try {
          const editorContent = JSON.stringify(editor.getHTML());
          setTaskDescription(JSON.stringify(editorContent));
          const body = {
            title: title,
            description: editorContent,
            status: status,
            assignee: assignee,
            priority: priority,
            tags: tags,
            project: project,
          };
          const response = await fetch("/api/task", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });

          if (response.ok) {
            alert("Task created successfully!");
            router.push('/')
          } else {
            alert("Error creating task");
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    },
    [editor, router, setTaskDescription]
  );

  const { generatedTags, loading: tagsLoading } = useTagGenerator(
    state.title,
    state.description
  );

  const value = useMemo(
    (): TaskEditorContext => ({
      ...state,
      editor,
      loading,
      generatedTags,
      tagsLoading,
      actions: {
        setTitle: (title) => {
          setTaskTitle(title);
        },
        setDescription: (description) => {
          setTaskDescription(description);
        },
        setStatus: (status) => {
          setTaskStatus(status);
        },
        setAssignee: (assignee) => {
          setTaskAssignee(assignee);
        },
        setPriority: (priority) => {
          setTaskPriority(priority);
        },
        setTags: (tags) => {
          setTaskTags(tags);
        },
        setProject: (project) => {
          setTaskProject(project);
        },
        deleteTags: (tags) => {
          deleteTaskTags(tags);
        },
        saveTask: (
          title: string,
          status: TASKSTATUS,
          assignee: ASSIGNEE[],
          priority: PRIORITY | undefined,
          tags: string[] | undefined,
          project: PROJECT | undefined
        ) => {
          handleSaveTask(title, status, assignee, priority, tags, project);
        },
      },
    }),
    [state, editor, loading, generatedTags, tagsLoading, setTaskTitle, setTaskDescription, setTaskStatus, setTaskAssignee, setTaskPriority, setTaskTags, setTaskProject, deleteTaskTags, handleSaveTask]
  );

  return (
    <TaskEditorContext.Provider value={value}>
      {children}
    </TaskEditorContext.Provider>
  );
};

export default TaskEditorProvider;
