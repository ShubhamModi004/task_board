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

// components
import Breadcrumb from "@/components/common/breadcrumb";
import { PROJECT } from "@/types/type";
import Platform from "@/components/common/platform";
import TextInput from "@/components/common/textInput";
import Pill from "@/components/common/pill";
import Dashed_button from "@/components/common/dashed_button";

// constants
import { statuses } from "@/utils/taskStatuses";
import { assignees } from "@/utils/taskAssignees";
import { priorities } from "@/utils/taskPriorities";
import { projects } from "@/utils/taskProjects";

// types

const TaskDetailPage = () => {
  const { task } = useContext(TaskContext);
  const editor = useEditor({
    extensions: [StarterKit, Heading, Bold, Italic, Image, TaskList, TaskItem, Link],
    content: `${task?.description}`,
    editable: false,
  });

  const selectedStatus = useMemo(() => {
    return (
      statuses.find(
        (item) => item.title.toUpperCase() === task?.status?.toUpperCase()
      ) || null
    );
  }, [task]);

  const selectedAssignee = useMemo(() => {
    return (
      assignees.find(
        (item) => item.title.toUpperCase() === task?.assignee?.toUpperCase()
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
              />,
              <p key="new-task" className={styles["task"]}>
                New Task
              </p>,
            ]}
          />
        </div>
        <section className={styles["container_top_task_title"]} id="task_title">
          <TextInput label={task?.title} disabled />
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
              <Dashed_button imagePath="/assets/icons/close.webp" text={tag} />
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
          {selectedAssignee && (
            <Pill
              image={selectedAssignee?.image}
              placeholder={selectedAssignee?.title}
            />
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
