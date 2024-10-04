"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./DropDownPill.module.scss";
import Pill from "../pill";

export type Item = { id: number; title: string; image?: React.JSX.Element };

interface Props {
  items?: Item[];
  image?: React.JSX.Element;
  placeholder?: string;
  onClick?: (item: Item) => void;
  disable?: boolean;
  multiSelect?: boolean;
}

const DropdownPill: React.FC<Props> = ({
  items,
  image,
  placeholder,
  onClick,
  disable = false,
  multiSelect = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm) {
      const filtered = items?.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);
    }
  }, [searchTerm, items]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOpen = useCallback(() => {
    if (disable) return;
    setIsOpen(!isOpen);
  }, [disable, isOpen]);

  const handleClick = useCallback(
    (item: Item) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onClick && onClick(item);
      if (!multiSelect) setIsOpen(false);
    },
    [multiSelect, onClick]
  );

  return (
    <div className={styles["dropdown"]} ref={dropdownRef}>
      <Pill image={image} placeholder={placeholder} onClick={toggleOpen} />

      {isOpen && (
        <div className={styles["dropdown_menu"]}>
          <input
            type="text"
            className={styles["dropdown_search"]}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className={styles["dropdown_list"]}>
            {filteredItems?.map((item) => (
              <div
                onClick={() => handleClick(item)}
                key={item.id}
                className={styles["dropdown_item"]}
              >
                {item?.image && item?.image}
                <p className={styles["dropdown_title"]}>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownPill;
