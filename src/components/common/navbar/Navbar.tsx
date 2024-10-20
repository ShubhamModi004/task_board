import React from "react";
import Link from "next/link";
import Image from "next/image";

// styles
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles["navbar"]}>
      <div className={styles["inner_container"]}>
        <Link href={"/"} className={styles["all_tasks"]}>
          <Image
            src={"/assets/icons/Tasks.svg"}
            alt="Tasks"
            width={16}
            height={16}
          />
          <p>All Tasks</p>
        </Link>
        <Link href={"/create"} className={styles["create"]}>
          <Image
            src={"/assets/icons/Create.svg"}
            alt="Create"
            width={16}
            height={16}
          />
          <p>Create Task</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
