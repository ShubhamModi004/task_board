"use client";
import React, {
    useCallback,
    useContext,
} from "react";
import Image from "next/image";
import moment from 'moment';

// packages
import { motion } from "framer-motion";
// styles
import styles from "./Table.module.scss";
// helpers
import { capitalizeFirstLetter } from "@/helpers/helpers";

// types
import { TaskContext } from "@/providers/task/Task.context";
import { Task } from "@/providers/task/Task.reducer";

interface TableProps {
    data?: Task[];
    loading: boolean;
    filter?: string;
}

const LineItem = (({ task, loading }: { task: Task; loading: boolean }) => {
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

    // const renderNoContent = (altText: string) => (
    //     <Image
    //         src={"/assets/icons/Nopriority.webp"}
    //         alt={altText}
    //         width={18}
    //         height={18}
    //         className={styles["avatar"]}
    //     />
    // );

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

    const renderDate = useCallback(() => {
        const date = moment(task?.createdAt).format('MMM DD');
        return (
            <p className={styles['date']}>{date}</p>
        );
    }, [task?.createdAt]);

    // const renderProject = useCallback(() => {
    //     const projectName = capitalizeFirstLetter(task.project || "NoProject");
    //     if (projectName === "Noproject") return renderNoContent("No Project");
    //     return (
    //         <Image
    //             src={`/assets/icons/${projectName}.webp`}
    //             alt={projectName}
    //             width={18}
    //             height={18}
    //             className={styles["avatar"]}
    //         />
    //     );
    // }, [task.project]);

    const renderTags = useCallback(() => {
        if (task.tags?.length == 0) return null;
        return (
            <div className={styles['tag-section']}>
                {task.tags?.map((i, index) => {
                    return (<div key={index} className={styles['tag']}>
                        <p>{i}</p>
                    </div>)
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
            className={styles['line-item']}
        >
            <div className={styles['left-section']}>

                {renderPriority()}

                <div className={styles['ml-8']}>
                    {renderStatus()}
                </div>
                <div className={styles["task_title"]}>

                    <p>{task.title}</p>
                </div>
            </div>

            <div className={styles['right-section']}>
                {renderTags()}
                <div className={styles['ml-8']}>
                    {renderDate()}
                </div>
                <div className={styles['ml-8']}>
                    {renderAssignee()}
                </div>
            </div>
        </motion.div>
    );
});

const List: React.FC<TableProps> = ({ data, loading, filter }) => {
    return (
        <motion.div
            className={styles["list-container"]}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className={styles["title-container"]}>
                <p>{filter ? filter : 'Active'} issues</p>
                <Image height={16} width={16} alt="star" src={'/assets/icons/star.svg'} />
            </div>
            {loading && !data
                ? <>
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className={`${styles["shimmer-row"]} ${styles['line-item']}`}>

                        </div>
                    ))}
                </>
                :
                (<>
                    {data?.map((task, index) => (
                        <LineItem key={index} task={task} loading={loading} />
                    ))}
                </>)}
        </motion.div>
    );
};

export default List;
