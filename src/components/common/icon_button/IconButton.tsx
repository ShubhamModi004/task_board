import React from 'react';
import classNames from 'classnames';
import styles from './IconButton.module.scss';

interface Props extends React.HTMLAttributes<HTMLButtonElement> { // Extend to accept HTML attributes
  image: React.JSX.Element;
  onClick?: () => void;
  isActive?: boolean;
  className?: string; 
}

const IconButton = ({
  image,
  onClick,
  isActive = false,
  className, 
  ...rest 
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        styles["container"],
        isActive ? styles["active"] : styles["in_active"],
        className 
      )}
      {...rest}
    >
      {isActive && <div className={styles["selected"]} />}
      {image}
    </button>
  );
};

export default IconButton;
