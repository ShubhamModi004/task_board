"use client";
import React, { useCallback, useContext, useMemo } from "react";
import Image from "next/image";

// context
import { TaskEditorContext } from "@/providers/text_editor/TaskEditor.context";

// components
import DropdownPill, { Item } from "@/components/common/drop_down_pill";
import { PROJECT } from "@/types/type";
import { projects } from "@/utils/taskProjects";

const Assignee = () => {
  const { project, actions } = useContext(TaskEditorContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultProject = {
    title: "Project",
    image: (
      <Image
        src={"/assets/icons/Project.webp"}
        alt="Frontend"
        width={16}
        height={16}
      />
    ),
  };

  const handleSelection = useCallback((item: Item) => {
    if (!actions) return;
    switch (item?.title) {
      case "Frontend":
        actions.setProject(PROJECT.FRONTEND);
        break;
      case "Cloud":
        actions.setProject(PROJECT.CLOUD);
        break;
      case "Performance":
        actions.setProject(PROJECT.PERFORMANCE);
        break;
      case "Backend":
        actions.setProject(PROJECT.BACKEND);
        break;
      case "Qa":
        actions.setProject(PROJECT.QA);
        break;

      default:
        break;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedValue = useMemo(() => {
    return (
      projects.find((item) => item.title.toUpperCase() === project) || defaultProject
    );
  }, [defaultProject, project]);

  return (
    <DropdownPill
      onClick={handleSelection}
      image={selectedValue?.image}
      items={projects}
      placeholder={selectedValue?.title}
    />
  );
};

export default Assignee;
