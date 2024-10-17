import React from "react";
import Image from "next/image";

// styles
import styles from "./Button.module.scss";

import Spinner from "../spinner";

interface Props {
  onClick?: () => void;
  text?: string;
  loading?: boolean;
}

const Button = ({ onClick, text, loading }: Props): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className={styles["button_container"]}
      disabled={loading}
    >
      {loading ? (
        <div className={styles["button_spinner"]}>
          <Spinner />
        </div>
      ) : (
        <>
          <p>{text || "Create"}</p>
          <div className={styles["divider"]}/>
          <Image className={styles["img"]} src={"/assets/icons/Enter.svg"} alt="Enter" width={16} height={16} />
        </>
      )}
    </button>
  );
};

export default Button;
