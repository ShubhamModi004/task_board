// Breadcrumb.tsx
import React, { ReactNode } from 'react';

// styles
import styles from './Breadcrumb.module.scss';
import Image from 'next/image';


// Props
interface BreadcrumbProps {
  items: ReactNode[]; 
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className={styles["breadcrumb"]}>
      <ul className={styles["breadcrumb__list"]}>
        {items.map((item, index) => (
          <li key={index} className={styles["breadcrumb__item"]}>
            {item}
            {index < items.length - 1 && (
              <span className={styles["breadcrumb__separator"]}>
                <Image src={"/assets/icons/right.webp"} alt='separator' width={4.44} height={7.76} />
              </span>
            )}
        </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
