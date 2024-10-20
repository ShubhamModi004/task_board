"use client";
import React, { useCallback, useContext, useMemo } from "react";

// context
import { TaskEditorContext } from "@/providers/text_editor/TaskEditor.context";

// components
import DropdownPill, { Item } from "@/components/common/drop_down_pill";
import { TASKSTATUS } from "@/types/type";

// helpers
import { statuses } from "@/utils/taskStatuses";

const TaskStatus = () => {
  const { status, actions } = useContext(TaskEditorContext);

  const handleSelection = useCallback((item: Item) => {
    let status = TASKSTATUS.TODO;
    if (item?.title === "Backlog") status = TASKSTATUS.BACKLOG;
    if (item?.title === "InProgress") status = TASKSTATUS.INPROGRESS;
    if (item?.title === "Completed") status = TASKSTATUS.COMPLETED;
    actions.setStatus(status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedValue = useMemo(() => {
    return (
      statuses.find((item) => item.title.toUpperCase() === status) ||
      statuses[0]
    );
  }, [status]);

  return (
    <DropdownPill
      onClick={handleSelection}
      image={selectedValue?.image}
      items={statuses}
      pillPlaceholder={selectedValue?.title}
      placeholder="Change Status"
    />
  );
};

export default TaskStatus;