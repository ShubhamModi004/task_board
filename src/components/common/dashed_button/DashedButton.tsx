import React from 'react';
import Image from 'next/image';

// styles
import styles from "./DashedButton.module.scss";


interface Props {
  onClick?: () => void;
  text?: string;
  imagePath?: string;
}

const DashedButton = ({ onClick, text, imagePath }: Props): JSX.Element => {
  return (
    <button onClick={onClick} className={styles["container"]}>
      <p>{text || 'Text'}</p>
      {imagePath && (<Image src={imagePath} alt="Close" width={8} height={8} />)}
    </button>
  )
}

export default DashedButton;