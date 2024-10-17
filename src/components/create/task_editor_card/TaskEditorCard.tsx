"use client";
import React, { useCallback, useContext } from "react";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// styles
import styles from "./TaskEditorCard.module.scss";

// components
import Platform from "@/components/common/platform";
import Breadcrumb from "@/components/common/breadcrumb";
import DropdownPill from "@/components/common/drop_down_pill";
import DashedButton from "@/components/common/dashed_button";
import Button from "@/components/common/button/Button";
import IconSection from "../icon_section/IconSection";
import TextInput from "@/components/common/textInput";
import TextEditor from "../task_editor/TaskEditor";
import TaskStatus from "../taskStatus";
import Assignee from "../assignee";
import Priority from "../priority";
import Tags from "../tags";
import Projects from "../projects";

// types
import { TaskEditorContext } from "@/providers/text_editor/TaskEditor.context";
import { PROJECT } from "@/types/type";
import { debounce } from "@/utils/helper";

const TaskEditorCard = (): JSX.Element => {
  const {
    title,
    status,
    assignee,
    priority,
    tags,
    project,
    loading,
    actions,
    generatedTags,
    tagsLoading,
  } = useContext(TaskEditorContext);

  console.log("generatedTags", generatedTags, tagsLoading);

  const CalendarImage = () => {
    return (
      <NextImage
        src={"/assets/icons/calendar.webp"}
        alt="Calendar"
        width={16}
        height={16}
      />
    );
  };

  const handleDelete = useCallback(
    (tag: string) => {
      actions.deleteTags(tag);
    },
    [actions]
  );

  // Debounced function for setting the title
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetTitle = useCallback(
    debounce((value: string) => {
      actions?.setTitle(value);
    }, 300),
    []
  );

  const submit = useCallback(() => {
    actions?.saveTask(
      title,
      status,
      assignee?.name || "",
      priority,
      tags,
      project
    );
  }, [actions, title, status, assignee, priority, project, tags]);

  return (
    <AnimatePresence>
      <div className={styles["container"]}>
        <div className={styles["container_top"]}>
          <div className={styles["container_top_breadcrumb"]} id="breadcrumb">
            <Breadcrumb
              items={[
                <Platform
                  key="platform-frontend"
                  platform={project ? project : PROJECT.FRONTEND}
                />,
                <p key="new-task" className={styles["task"]}>
                  New Task
                </p>,
              ]}
            />
          </div>

          <section
            className={styles["container_top_task_title"]}
            id="task_title"
          >
            <TextInput label="Task Title" handleChange={debouncedSetTitle} />
          </section>

          <section
            className={styles["container_top_task_description"]}
            id="task_description"
          >
            <TextEditor />
          </section>
          {!tagsLoading && (
            <motion.section
              className={styles["container_top_ai_suggestions"]}
              initial={{ height: "0px", opacity: 0 }}
              animate={{
                height: tags && tags?.length > 0 ? "auto" : "0px",
                opacity: tags && tags?.length > 0 ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "linear" }}
            >
              <AnimatePresence>
                {generatedTags?.map((tag, index) => {
                  console.log("tags", tags);
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <DashedButton
                        onClick={() => handleDelete(tag)}
                        imagePath="/assets/icons/close.webp"
                        text={tag}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.section>
          )}
          <section className={styles["container_top_task_attachements"]}>
            <TaskStatus />
            <Assignee />
            <Priority />
            <Tags />
            <Projects />
            <DropdownPill
              image={CalendarImage()}
              placeholder="Due Date"
              disable={true}
            />
          </section>
        </div>

        <div className={styles["divider"]} />

        <div className={styles["container_bottom"]}>
          <section className={styles["container_bottom_task_editor"]}>
            <IconSection />
          </section>
          <Button onClick={submit} loading={loading} />
        </div>
      </div>
    </AnimatePresence>
  );
};

export default TaskEditorCard;
