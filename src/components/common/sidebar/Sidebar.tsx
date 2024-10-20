'use client'
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
// styles
import styles from "./Sidebar.module.scss";
import DropDown from "../drop_down";
import Link from "next/link";

const Sidebar = () => {
    const router = useRouter();

    const [selectedItem, setSelected] = useState<string>('');

    return (
        <nav className={styles["sidebar"]}>
            <div className={styles['header']}>
                <div className={styles['name-cont']}>
                    <Image width={20} height={20} src={'/assets/icons/logo.svg'} alt={"icon"} />
                    <span className={styles['name']}>Task Board</span>
                </div>

                <Link href={'/create'} className={styles['bttn']} >
                    <Image width={16} height={16} src={"/assets/icons/create.svg"} alt={"create-icon"} />
                </Link>
            </div>
            <DropDown selectedItem={selectedItem} onSelect={function (s: string): void {
                setSelected(s);
                router.push(`/?filter=${s}`);
            }} />
        </nav>
    );
};

export default Sidebar;
