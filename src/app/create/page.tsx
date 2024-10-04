"use client";
import TaskEditor from "@/components/create/task_editor_card";
import styles from "./page.module.scss";
import TaskEditorProvider from "@/providers/text_editor/TaskEditor.provider";

const Home = () => {
  return (
    <div className={styles["container"]}>
      <TaskEditorProvider>
        <TaskEditor />
      </TaskEditorProvider>
    </div>
  );
}

export default Home;
