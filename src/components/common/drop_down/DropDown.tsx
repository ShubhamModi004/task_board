"use client";
import React, { useState } from "react";
import Image from "next/image";
//styles
import styles from "./DropDown.module.scss";

const DropDown = ({
  selectedItem,
  onSelect,
}: {
  selectedItem: string;
  onSelect: (s: string) => void;
}) => {
  const [selected, setSelected] = useState(false);

  const toggleDropdown = () => setSelected(!selected);

  return (
    <div className={styles["container"]}>
      <div className={styles["header"]} onClick={toggleDropdown}>
        <div className={styles["img_cont"]}>
          <Image
            width={14}
            height={14}
            src={"/assets/icons/music.svg"}
            alt={"icon"}
          />
        </div>
        <span className={styles["title"]}>my workspace</span>
        <Image
          className={selected ? styles["arrow_down"] : styles["arrow_cont"]}
          width={14}
          height={14}
          src={"/assets/icons/arrow.svg"}
          alt={"arrow"}
        />
      </div>
      {selected && (
        <div className={styles["drop_down_cont"]}>
          <div className={styles["item"]}>
            <div
              onClick={() => {
                onSelect("All");
              }}
              className={`${styles["title_cont"]} ${
                selectedItem == "Issues" && styles["selected"]
              }`}
            >
              <Image
                width={16}
                height={16}
                src={"/assets/icons/issues.svg"}
                alt={"icon"}
              />
              <span className={styles["item-title"]}>Issues</span>
            </div>
            <div className={styles["list_cont"]}>
              {["Frontend", "Cloud", "Performance", "Backend", "Qa"].map(
                (item) => (
                  <div
                    key={item}
                    onClick={() => onSelect(item)}
                    className={`${styles["filter_cont"]} ${
                      selectedItem === item && styles["selected"]
                    }`}
                  >
                    <span className={styles["filter-title"]}>{item}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
