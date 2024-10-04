"use client";
import React, { useCallback, useContext, useMemo } from "react";

// context
import { TaskEditorContext } from "@/providers/text_editor/TaskEditor.context";

// components
import DropdownPill, { Item } from "@/components/common/drop_down_pill";
import { PRIORITY } from "@/types/type";
import { priorities } from "@/utils/taskPriorities";

const Priority = () => {
  const { priority, actions } = useContext(TaskEditorContext);

  const handleSelection = useCallback((item: Item) => {
    let priority;
    if (item?.title === "Priority") priority = PRIORITY.NONE;
    if (item?.title === "Urgent") priority = PRIORITY.URGENT;
    if (item?.title === "High") priority = PRIORITY.HIGH;
    if (item?.title === "Medium") priority = PRIORITY.MEDIUM;
    if (item?.title === "Low") priority = PRIORITY.LOW;
    if (priority) actions.setPriority(priority);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedValue = useMemo(() => {
    return (
      priorities.find((item) => item.title.toUpperCase() === priority) ||
      priorities[0]
    );
  }, [priority]);

  return (
    <DropdownPill
      onClick={handleSelection}
      image={selectedValue?.image}
      items={priorities}
      placeholder={selectedValue?.title}
    />
  );
};

export default Priority;
