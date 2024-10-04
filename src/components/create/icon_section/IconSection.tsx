"use client";
import React, { useCallback, useContext, useMemo, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic"; // For dynamic import of EmojiPicker

// styles
import styles from "./IconSection.module.scss";

// components
import IconButton from "@/components/common/icon_button/IconButton";
import Clip from "../clip";
// context
import { TaskEditorContext } from '@/providers/text_editor/TaskEditor.context';
import { EmojiClickData } from "emoji-picker-react";

// Dynamically import EmojiPicker to prevent SSR issues
const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const IconSection = (): JSX.Element | null => {
  const { editor } = useContext(TaskEditorContext);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to toggle emoji picker

  const onEmojiClick = useCallback((emoji: EmojiClickData) => {
    editor?.chain().focus().insertContent(emoji.emoji).run();
    setShowEmojiPicker(false); 
  }, [editor]);

  const icons = useMemo(() => [
    {
      name: "Tagger",
      action: () => console.log("Tagging function"),
      isActive: false,
    },
    {
      name: "Emoji",
      action: () => setShowEmojiPicker((prev) => !prev), // Toggle the emoji picker
      isActive: false,
    },
    {
      name: "Heading",
      action: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor?.isActive("heading", { level: 1 }) ?? false,
    },
    {
      name: "Bold",
      action: () => editor?.chain().focus().toggleBold().run(),
      isActive: editor?.isActive("bold") ?? false,
    },
    {
      name: "Italics",
      action: () => editor?.chain().focus().toggleItalic().run(),
      isActive: editor?.isActive("italic") ?? false,
    },
    {
      name: "Code",
      action: () => editor?.chain().focus().toggleCode().run(),
      isActive: editor?.isActive("code") ?? false,
    },
    {
      name: "NumberListing",
      action: () => editor?.chain().focus().toggleOrderedList().run(),
      isActive: editor?.isActive("orderedList") ?? false,
    },
    {
      name: "BulletListing",
      action: () => editor?.chain().focus().toggleBulletList().run(),
      isActive: editor?.isActive("bulletList") ?? false,
    },
    {
      name: "TickListing",
      action: () => editor?.chain().focus().toggleTaskList().run(),
      isActive: editor?.isActive("taskList") ?? false,
    },
  ], [editor]);

  if (!editor) return null;

  return (
    <div className={styles["container"]}>
      <Clip />
      {icons.map((icon, index) => (
        <IconButton
          key={index}
          image={
            <Image
              src={`/assets/icons/${icon?.name}.webp`}
              alt={icon?.name}
              width={18}
              height={18}
            />
          }
          onClick={icon.action}
          isActive={icon?.isActive}
        />
      ))}

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className={styles["emoji_picker_container"]}>
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default IconSection;
