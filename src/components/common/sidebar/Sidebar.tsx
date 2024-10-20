'use client'
import React, { useState } from "react";
import Image from "next/image";

// styles
import styles from "./Sidebar.module.scss";
import DropDown from "../drop_down";

const Sidebar = () => {
    const [selectedItem, setSelected] = useState<string>('');

    return (
        <nav className={styles["sidebar"]}>
            <div className={styles['header']}>
                <div className={styles['name-cont']}>
                    <Image width={20} height={20} src={'/assets/icons/Frontend.webp'} alt={"icon"} />
                    <span className={styles['name']}>Task Board</span>
                </div>

                <button className={styles['bttn']}>
                    <Image width={16} height={16} src={"/assets/icons/create.svg"} alt={"create-icon"} />
                </button>
            </div>
            <DropDown selectedItem={selectedItem} onSelect={function (s: string): void {
                setSelected(s);
            }} />
        </nav>
    );
};

export default Sidebar;
