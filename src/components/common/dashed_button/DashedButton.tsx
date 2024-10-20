import React from 'react';

// styles
import styles from "./DashedButton.module.scss";


interface Props {
  onClick?: () => void;
  text?: string;
  selected?: boolean;
}

const DashedButton = ({ onClick, text, selected }: Props): JSX.Element => {
  return (
    <button onClick={onClick} className={`${styles["container"]} ${selected && `${styles["selected"]}`}`}>
      <p>{text || 'Text'}</p>
    </button>
  )
}

export default DashedButton;