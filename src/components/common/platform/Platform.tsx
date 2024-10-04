"use client";
import React, { useMemo } from "react";
import Image from "next/image";
// styles
import styles from "./Platform.module.scss";

// types
import { PROJECT } from "@/types/type";
import { capitalizeFirstLetter } from "@/helpers/helpers";

interface Props {
  platform: PROJECT;
}

const Platform = ({ platform }: Props) => {
  const imagePath = useMemo(() => {
    switch (platform) {
      case PROJECT.FRONTEND:
        return "/assets/icons/Frontend.webp";
      case PROJECT.BACKEND:
        return "/assets/icons/Backend.webp";
      case PROJECT.CLOUD:
        return "/assets/icons/Cloud.webp";
      case PROJECT.PERFORMANCE:
        return "/assets/icons/Performance.webp";
      case PROJECT.QA:
        return "/assets/icons/Qa.webp";

      default:
        return "/assets/icons/Frontend.webp";
    }
  }, [platform]);

  return (
    <div className={styles["container"]}>
      <Image
        src={imagePath}
        alt="Frontend"
        width={16}
        height={16}
      />
      <p>{capitalizeFirstLetter(platform)}</p>
    </div>
  );
};

export default Platform;
