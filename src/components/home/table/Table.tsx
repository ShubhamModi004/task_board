"use client";
import React, {
  useCallback,
  useContext,
  useMemo,
  useEffect,
  useState
} from "react";
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
// packages
import { motion } from "framer-motion";
// styles
import styles from "./Table.module.scss";
// helpers
import { capitalizeFirstLetter } from "@/helpers/helpers";

// types
import { TaskContext } from "@/providers/task/Task.context";
import { Task } from "@/providers/task/Task.reducer";
import List from "./List";

interface TableProps {
  data?: Task[];
  loading: boolean;
}

const TableRow = (({ task, loading }: { task: Task; loading: boolean }) => {
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

  const renderNoContent = (altText: string) => (
    <Image
      src={"/assets/icons/Nopriority.webp"}
      alt={altText}
      width={18}
      height={18}
      className={styles["avatar"]}
    />
  );

  const renderStatus = useCallback(() => {
    const image = capitalizeFirstLetter(task.status || "");
    return (
      <Image
        src={`/assets/icons/${image}.webp`}
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
        src={`/assets/icons/${image}.webp`}
        alt={image}
        width={18}
        height={18}
        className={styles["avatar"]}
      />
    );
  }, [task.priority]);

  const renderAssignee = useCallback(() => {
    const assigneeImage = task.assignee
      ? "https://i.pravatar.cc/150?img=55"
      : "/assets/icons/avatar.webp";
    const assigneeName = task.assignee || "No Assignee";
    return (
      <Image
        src={assigneeImage}
        alt={assigneeName}
        width={18}
        height={18}
        className={styles["avatar"]}
      />
    );
  }, [task.assignee]);

  const renderProject = useCallback(() => {
    const projectName = capitalizeFirstLetter(task.project || "NoProject");
    if (projectName === "Noproject") return renderNoContent("No Project");
    return (
      <Image
        src={`/assets/icons/${projectName}.webp`}
        alt={projectName}
        width={18}
        height={18}
        className={styles["avatar"]}
      />
    );
  }, [task.project]);

  const renderTags = useCallback(() => {
    if (!task.tags?.length || task.tags[0] === "") return null;
    return (
      <Image
        src="/assets/icons/Tag.svg"
        alt="Tags"
        width={18}
        height={18}
        className={styles["avatar"]}
      />
    );
  }, [task.tags]);

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: loading ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      onClick={handleClick}
    >
      <td className={styles["task_title"]}>
        <Image
          src="/assets/icons/Tasks.webp"
          alt="Tasks"
          width={16}
          height={16}
        />
        <p>{task.title}</p>
      </td>
      <td>{renderStatus()}</td>
      <td>{renderPriority()}</td>
      <td>{renderAssignee()}</td>
      <td>{renderProject()}</td>
      <td>{renderTags()}</td>
    </motion.tr>
  );
});

const TableComponent: React.FC<TableProps> = ({ data, loading }) => {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState('')
  useEffect(() => {
    const typeParam = searchParams?.get('filter');
    setFilter(typeParam ? typeParam : '')
  }, [searchParams]);

  const filteredData = useMemo(() => {
    if (filter && filter != 'All') {
      return data?.filter((i) => String(i?.project)?.toLowerCase() == filter?.toLowerCase());
    } else {
      return data;
    }
  }, [data, filter])

  return (
    <List data={filteredData} loading={loading} filter={filter} />
  );
};

export default TableComponent;
