"use client";
import React, { useCallback, useContext } from 'react';
import Image from 'next/image';

// styles
import styles from "./Tags.module.scss";

// context
import { TaskEditorContext } from '@/providers/text_editor/TaskEditor.context';

// components
import DropdownPill, { Item } from '@/components/common/drop_down_pill';
import { taskTags } from '@/utils/taskTags';

const Tags = () => {
  const { actions, tags } = useContext(TaskEditorContext);

  const handleSelection = useCallback((item: Item) => {
    const isAlreadySelected = tags?.includes(item?.title);
    if (isAlreadySelected) {
      actions?.deleteTags(item?.title);
    } else {
      actions.setTags(item?.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  const tagImage = useCallback(() => {
    if (tags?.length) {
      return (
        <div className={styles["tags"]}>
          {tags?.map((_, i) => (
            <div key={i} className={styles["tag"]} />
          ))}
        </div>
      )
    } else {
      return (
        <Image src={"/assets/icons/Tag.svg"} alt='tag' width={16} height={16}/>
      )
    }
    
  }, [tags]);


  return (
    <DropdownPill
      onClick={handleSelection}
      image={tagImage()}
      items={taskTags}
      pillPlaceholder={(tags?.length && tags?.length > 0) ? `${tags?.length} Tags`: "Choose Tags"}
      multiSelect={true}  
    />
  );
}

export default Tags;
