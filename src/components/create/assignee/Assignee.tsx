"use client";
import React, { useCallback, useContext } from "react";
import Image from "next/image";

// styles
import "./Assignee.scss";

// context
import { TaskEditorContext } from "@/providers/text_editor/TaskEditor.context";

// components
import DropdownPill, { Item } from "@/components/common/drop_down_pill";
import { assignees } from "@/utils/taskAssignees";

const Assignee = () => {
  const { assignee, actions } = useContext(TaskEditorContext);

  const handleSelection = useCallback((item: Item) => {
    actions.setAssignee({
      name: item?.title,
      imageUrl: "https://i.pravatar.cc/150?img=56",
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const UserImage = useCallback(() => {
    return (
      <Image
        src={
          assignee
            ? "https://i.pravatar.cc/150?img=55"
            : "/assets/icons/avatar.webp"
        }
        alt={assignee ? assignee.name : "Avatar"}
        width={16}
        height={16}
        className="avatar"
      />
    );
  }, [assignee]);

  return (
    <DropdownPill
      onClick={handleSelection}
      image={UserImage()}
      items={assignees}
      placeholder={assignee?.name || "Assignee"}
    />
  );
};

export default Assignee;
