"use client";
// styles
import styles from "./TextInput.module.scss";

// libraries
import React, { useCallback, useRef, } from "react";


interface Props extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  defaultValue?: string;
  handleChange?: (value: string) => void;
}

const TextInput: React.FC<Props> = ({
  label = "",
  defaultValue = "",
  handleChange,
  ...props
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);


  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value;
      handleChange?.(value);
    },
    [handleChange]
  );

  return (
    <div
      className={styles.container}>
      <input
        ref={inputRef}
        className={
          styles["text_input"]
        }
        defaultValue={defaultValue}
        placeholder={label}
        onChange={onChange}
        maxLength={100}
        {...props}
      />
    </div>
  );
};

export default React.memo(TextInput);
