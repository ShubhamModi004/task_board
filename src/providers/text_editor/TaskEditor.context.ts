import { createContext } from "react";

// types
import { ASSIGNEE, PRIORITY, PROJECT, TASKSTATUS } from "@/types/type";
import { TaskEditorState } from "./TaskEditor.reducer";
import { Editor } from "@tiptap/react";

export interface TaskEditorContext extends TaskEditorState {
    editor: Editor | null;
    loading: boolean;
    actions: {
        setTitle: (title: string) => void;
        setDescription: (description: string) => void;
        setStatus: (status: TASKSTATUS) => void;
        setAssignee: (assignee: ASSIGNEE) => void;
        setPriority: (priority: PRIORITY) => void;
        setTags: (tags: string) => void;
        deleteTags: (tags: string) => void;
        setProject: (project: PROJECT) => void;
        saveTask: (title: string, status: TASKSTATUS, assignee: string, priority: PRIORITY | undefined , tags: string[] | undefined, project: PROJECT | undefined) => void;
    }
}

export const TaskEditorContext = createContext<TaskEditorContext>({} as TaskEditorContext);