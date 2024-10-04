import React from "react";

import styles from "./Pill.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  image: React.ReactNode;
  placeholder?: string;
}

const Pill = ({ image, placeholder, ...rest }: Props): JSX.Element => {
  return (
    <div className={styles["container"]} {...rest}>
      {image}
      <p>{placeholder || ""}</p>
    </div>
  );
};

export default Pill;
