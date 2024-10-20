"use client";
import React, { useCallback, useContext } from "react";
import Image from "next/image";
import moment from "moment";

// packages
import { motion } from "framer-motion";
// styles
import styles from "./Table.module.scss";
// helpers
import { capitalizeFirstLetter } from "@/helpers/helpers";

// types
import { TaskContext } from "@/providers/task/Task.context";
import { Task } from "@/providers/task/Task.reducer";
import AvatarGroup from "@/components/common/avatarGroup";

interface TableProps {
  data?: Task[];
  loading: boolean;
  filter?: string;
}

const LineItem = ({ task, loading }: { task: Task; loading: boolean }) => {
  const { actions } = useContext(TaskContext);

  const handleClick = () => {
    const data: Task = {
      title: task?.title,
      description: task?.description,
      status: task?.status,
      assignee: task?.assignee,
      priority: task?.priority,
      tags: task?.tags,
      project: task?.project,
    };
    actions.setTask(data);
  };

  const renderStatus = useCallback(() => {
    const image = capitalizeFirstLetter(task.status || "");
    return (
      <Image
        src={`/assets/icons/${image}.svg`}
        alt={image}
        width={18}
        height={18}
        className={styles["avatar"]}
      />
    );
  }, [task.status]);

  const renderPriority = useCallback(() => {
    const image = capitalizeFirstLetter(task.priority || "Nopriority");
    return (
      <Image
        src={`/assets/icons/${image}.svg`}
        alt={image}
        width={18}
        height={18}
        className={styles["avatar"]}
      />
    );
  }, [task.priority]);

  const renderAssignee = useCallback(() => {
    console.log("task?.assignee", task?.assignee);
    if (!task?.assignee || !task?.assignee?.length) {
      return (
        <Image
          src={"/assets/icons/avatar.svg"}
          alt={"Avatar"}
          width={16}
          height={16}
          className="avatar"
        />
      );
    } else {
      return <AvatarGroup assignees={task.assignee} />;
    }
  }, [task.assignee]);

  const renderDate = useCallback(() => {
    const date = moment(task?.createdAt).format("MMM DD");
    return <p className={styles["date"]}>{date}</p>;
  }, [task?.createdAt]);

  const renderTags = useCallback(() => {
    if (task.tags?.length == 0) return null;
    return (
      <div className={styles["tag-section"]}>
        {task?.tags?.slice(0, 2).map((item, index) => {
          if (!task?.tags) return <></>;
          return (
            <div key={index} className={styles["tag"]} style={(index == 0 && task?.tags?.length > 2) ? {zIndex: -1, marginRight: `-4rem`} : {zIndex: 0}}>
              <div className={styles["dot"]} />
              <p>
                {task?.tags?.length > 2 && index == 1
                  ? `+${task?.tags?.length - 2} tags`
                  : item}
              </p>
            </div>
          );
        })}
      </div>
    );
  }, [task.tags]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: loading ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      onClick={handleClick}
      className={styles["line-item"]}
    >
      <div className={styles["left-section"]}>
        {renderPriority()}

        <div className={styles["ml-8"]}>{renderStatus()}</div>
        <div className={styles["task_title"]}>
          <span>{task.title}</span>
        </div>
      </div>

      <div className={styles["right-section"]}>
        {renderTags()}
        <div className={styles["ml-8"]}>{renderDate()}</div>
        <div className={styles["ml-8"]}>{renderAssignee()}</div>
      </div>
    </motion.div>
  );
};

const List: React.FC<TableProps> = ({ data, loading, filter }) => {
  return (
    <motion.div
      className={styles["list-container"]}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles["title-container"]}>
        <div className={styles["logo_container"]}>
          <Image
            src="/assets/icons/logo.svg"
            alt="Task board"
            width={14}
            height={14}
          />
        </div>
        <p>Task Board</p>
        <Image
          src={"/assets/icons/right.svg"}
          alt="separator"
          width={20}
          height={20}
        />
        <p>{filter ? filter : "All"} issues</p>
        <div className={styles["star"]}>
          <Image
            height={16}
            width={16}
            alt="star"
            src={"/assets/icons/star.svg"}
          />
        </div>
      </div>
      {loading && !data ? (
        <>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`${styles["shimmer-row"]} ${styles["line-item"]}`}
            ></div>
          ))}
        </>
      ) : (
        <>
          {data?.map((task, index) => (
            <LineItem key={index} task={task} loading={loading} />
          ))}
        </>
      )}
    </motion.div>
  );
};

export default List;
