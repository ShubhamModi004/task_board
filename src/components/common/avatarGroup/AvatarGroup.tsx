import React from 'react';
import Image from 'next/image';
import styles from  './AvatarGroup.module.scss'; // Add styling for the avatar group
import { ASSIGNEE } from '@/types/type';


interface AvatarGroupProps {
  assignees?: ASSIGNEE[];
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ assignees }) => {
  return (
    <div className={styles["assignee-avatar-group"]}>
    {assignees?.map((assignee, index) => (
        <div key={assignee.id} className={styles["avatar-wrapper"]} style={{ zIndex: assignees.length - index }}>
          <Image
            src={assignee.imageUrl}
            alt={assignee.name}
            width={16}
            height={16}
            className="avatar"
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
