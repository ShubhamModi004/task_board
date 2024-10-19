"use client";
import React, { useCallback, useContext, useState } from "react";
import Image from "next/image";

// styles
import "./Assignee.scss";

// context
import { TaskEditorContext } from "@/providers/text_editor/TaskEditor.context";

// components
import DropdownPill, { Item } from "@/components/common/drop_down_pill";
import { assignees } from "@/utils/taskAssignees";
import { ASSIGNEE } from "@/types/type";
import AvatarGroup from "@/components/common/avatarGroup";

const Assignee = () => {
  const { assignee, actions } = useContext(TaskEditorContext);
  const [selectedAssignees, setSelectedAssignees] = useState(assignee ||  []);

  const handleSelection = useCallback(
    (item: Item) => {
      const isAlreadySelected = selectedAssignees.find(
        (assignee) => assignee.id === item.id
      );
      let updatedAssignees;

      if (isAlreadySelected) {
        // Remove the selected item if already in the list
        updatedAssignees = selectedAssignees.filter(
          (assignee) => assignee.id !== item.id
        );
      } else {
        const newAssignee: ASSIGNEE = {
          id: item.id,
          name: item.title,
          imageUrl: item.imageLink || "https://i.pravatar.cc/150?img=56", // map `imageLink` to `imageUrl`
        };
        updatedAssignees = [...selectedAssignees, newAssignee];
      }

      setSelectedAssignees(updatedAssignees);
      actions.setAssignee(updatedAssignees);
    },
    [selectedAssignees, actions]
  );

  const UserImage = useCallback(() => {
    return (
      <Image
        src={"/assets/icons/avatar.svg"}
        alt={"Avatar"}
        width={16}
        height={16}
        className="avatar"
      />
    );
  }, []);
  
  return (
    <DropdownPill
      onClick={handleSelection}
      image={
        (assignee?.length && assignee?.length > 0) ? (
          <AvatarGroup assignees={assignee} />
        ) : (
          UserImage()
        )
      }
      items={assignees}
      placeholder="Select assignees"
      pillPlaceholder="Assignee"
      multiSelect={true}
    />
  );
};

export default Assignee;
