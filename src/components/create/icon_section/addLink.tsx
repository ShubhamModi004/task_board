import { Editor } from "@tiptap/react";

// Function to prompt for link and insert it
export const addLink = (editor: Editor | null) => {
  if (!editor) return;

  const url = prompt("Enter a URL:");

  if (url) {
    editor
      .chain()
      .focus()
      .extendMarkRange("link") // Extends the current selection to the whole link
      .setLink({ href: url })
      .run();
  } else {
    editor.chain().focus().unsetLink().run(); // Remove the link if no URL is provided
  }
};
