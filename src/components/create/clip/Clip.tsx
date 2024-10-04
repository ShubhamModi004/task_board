import React, { useCallback, useContext } from "react";
import Image from "next/image";

// upload things library
import { ClientUploadedFileData } from "uploadthing/types";
import { UploadButton } from "@/utils/uploadthings";

// styles
import styles from "./Clip.module.scss";
import "@uploadthing/react/styles.css";

// components
import IconButton from "@/components/common/icon_button";

// types
import { TaskEditorContext } from "@/providers/text_editor/TaskEditor.context";


const Clip = (): JSX.Element | null => {
  const { editor } = useContext(TaskEditorContext);

  const onUploadComplete = useCallback(
    (res: ClientUploadedFileData<{ uploadedBy: string }>[]) => {
      const fileUrl = res[0]?.url; 
      if (fileUrl) {
        editor?.chain()?.focus()?.setImage({ src: fileUrl }).run(); // Ensure your Tiptap setup has the image extension
      }
    },
    [editor]
  );

  const onUploadError = useCallback((error: Error) => {
    alert(`ERROR! ${error.message}`);
  }, []);


  if (!editor) return null;
  return (
    <div className={styles.clipIconContainer}>
      <IconButton
        image={
          <Image
            src={`/assets/icons/Clip.webp`}
            alt={"Clip"}
            width={18}
            height={18}
          />
        }
      />
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={onUploadComplete}
        onUploadError={onUploadError}
        className={styles["upload_thing_button"]}
      />
    </div>
  );
};

export default Clip;
