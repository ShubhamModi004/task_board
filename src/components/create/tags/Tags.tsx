"use client";
import React, { useCallback, useContext } from 'react';
import Image from 'next/image';

// context
import { TaskEditorContext } from '@/providers/text_editor/TaskEditor.context';

// components
import DropdownPill, { Item } from '@/components/common/drop_down_pill';
import { taskTags } from '@/utils/taskTags';

const Tags = () => {
  const { actions } = useContext(TaskEditorContext);

  // Handle selection and update context tags
  const handleSelection = useCallback((item: Item) => {
    actions.setTags(item?.title);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tagImage = useCallback(() => {
    return (
      <Image src={"/assets/icons/Tag.webp"} alt='tag' width={16} height={16}/>
    )
  }, []);

  return (
    <DropdownPill
      onClick={handleSelection}
      image={tagImage()}
      items={taskTags}
      placeholder="Choose Tags"
      multiSelect={true}  // Disable search functionality
    />
  );
}

export default Tags;
