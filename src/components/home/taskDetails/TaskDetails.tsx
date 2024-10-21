"use client";
import { useContext, useMemo } from "react";

// styles
import styles from "./TaskDetails.module.scss";
import "./Editor.scss";

// providers
import { TaskContext } from "@/providers/task/Task.context";

// tip tap
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import { Heading } from "@tiptap/extension-heading";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Typography from '@tiptap/extension-typography'
import Highlight from '@tiptap/extension-highlight'

// components
import Breadcrumb from "@/components/common/breadcrumb";
import { PROJECT } from "@/types/type";
import Platform from "@/components/common/platform";
import TextInput from "@/components/common/textInput";
import Pill from "@/components/common/pill";
import Dashed_button from "@/components/common/dashed_button";

// constants
import { statuses } from "@/utils/taskStatuses";
import { priorities } from "@/utils/taskPriorities";
import { projects } from "@/utils/taskProjects";
import AvatarGroup from "@/components/common/avatarGroup";
import DropdownPill from "@/components/common/drop_down_pill";

// types

const TaskDetailPage = () => {
  const { task } = useContext(TaskContext);
  const editor = useEditor({
    extensions: [StarterKit,
      Highlight,
      Typography,
      Heading,
      TaskList,
      TaskItem,
      Bold,
      Italic,
      Link,
      Image,],
    content: `${JSON.parse(task?.description)}`,
    editable: false,
  });

  const selectedStatus = useMemo(() => {
    return (
      statuses.find(
        (item) => item.title.toUpperCase() === task?.status?.toUpperCase()
      ) || null
    );
  }, [task]);

  const selectedPriority = useMemo(() => {
    return (
      priorities.find(
        (item) => item.title.toUpperCase() === task?.priority?.toUpperCase()
      ) || null
    );
  }, [task]);

  const selectedProject = useMemo(() => {
    return (
      projects.find(
        (item) => item.title.toUpperCase() === task?.project?.toUpperCase()
      ) || null
    );
  }, [task]);

  return (
    <div className={styles["container"]}>
      <div className={styles["container_top"]}>
        <div className={styles["container_top_breadcrumb"]} id="breadcrumb">
          <Breadcrumb
            items={[
              <Platform
                key="platform-frontend"
                platform={task?.project ? task?.project : PROJECT.FRONTEND}
              />
            ]}
          />
        </div>
        <section className={styles["container_top_task_title"]} id="task_title">
          <p>{task?.title}</p>
        </section>

        <section
          className={styles["container_top_task_description"]}
          id="task_description"
        >
          <EditorContent editor={editor} className={"editor-content"} />
        </section>

        <section className={styles["container_top_ai_suggestions"]}>
          {task?.tags?.map((tag, index) => (
            <div key={index}>
              <Dashed_button text={tag} />
            </div>
          ))}
        </section>

        <section className={styles["container_top_task_attachements"]}>
          {selectedStatus && (
            <Pill
              image={selectedStatus?.image}
              placeholder={selectedStatus?.title}
            />
          )}
          {task?.assignee && (
            <DropdownPill image={<AvatarGroup assignees={task?.assignee} />} pillPlaceholder="Assignee" disable={true}/>
          )}
          
          {selectedPriority && (
            <Pill
              image={selectedPriority?.image}
              placeholder={selectedPriority?.title}
            />
          )}
          {selectedProject && (
            <Pill
              image={selectedProject?.image}
              placeholder={selectedProject?.title}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default TaskDetailPage;
