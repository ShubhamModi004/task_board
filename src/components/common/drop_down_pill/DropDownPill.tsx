"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./DropDownPill.module.scss";
import Pill from "../pill";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export type Item = {
  id: number;
  title: string;
  imageLink?: string;
  image?: React.JSX.Element;
};

interface Props {
  items?: Item[];
  image?: React.JSX.Element;
  pillPlaceholder?: string;
  placeholder?: string;
  onClick?: (item: Item) => void;
  disable?: boolean;
  multiSelect?: boolean;
}

const DropdownPill: React.FC<Props> = ({
  items,
  image,
  pillPlaceholder = "",
  placeholder = "",
  onClick,
  disable = false,
  multiSelect = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
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
      const isChecked = selectedItems.some(
        (selected) => selected.id === item.id
      );
      let updatedSelectedItems;

      if (isChecked) {
        updatedSelectedItems = selectedItems.filter(
          (selected) => selected.id !== item.id
        );
      } else {
        updatedSelectedItems = [...selectedItems, item];
      }

      setSelectedItems(updatedSelectedItems);
      if (onClick) onClick(item);
      if (!multiSelect) setIsOpen(false);
    },
    [selectedItems, onClick, multiSelect]
  );

  return (
    <div className={styles["dropdown"]} ref={dropdownRef}>
      <Pill image={image} placeholder={pillPlaceholder} onClick={toggleOpen} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles["dropdown_menu"]}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="text"
              className={styles["dropdown_search"]}
              placeholder={placeholder || "Search..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className={styles["dropdown_list"]}>
              {filteredItems?.map((item, index) => {
                const isSelected = multiSelect
                  ? false
                  : pillPlaceholder == item?.title;
                const isChecked = selectedItems.some(
                  (selected) => selected.id === item.id
                );
                return (
                  <div
                    onClick={() => handleClick(item)}
                    key={item.id}
                    className={`${styles["dropdown_item"]} ${
                      isSelected && styles["selected"]
                    }`}
                  >
                    <div className={styles["left_section"]}>
                      {multiSelect && (
                        <input
                          type="checkbox"
                          className={`${
                            isChecked
                              ? styles["checkbox"]
                              : styles["checkbox_not_selected"]
                          }`}
                          checked={isChecked}
                          readOnly
                        />
                      )}
                      {item?.image && item?.image}
                      <p>{item.title}</p>
                    </div>
                    {!multiSelect && (
                      <div className={styles["right_section"]}>
                        {pillPlaceholder === item?.title && (
                          <Image
                            src={"/assets/icons/tick.svg"}
                            alt="tick"
                            width={16}
                            height={16}
                          />
                        )}
                        <p className={styles["numbering"]}>{index + 1}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownPill;
