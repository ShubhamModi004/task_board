import { Editor } from "@tiptap/react";

// Function to prompt for link and insert it
export const addLink = (editor: Editor | null) => {
  if (!editor) return;

  const url = prompt("Enter a URL:");

  if (url) {
    const selectedText = editor?.state?.selection?.empty
          ? null
          : editor?.state.doc.textBetween(
              editor?.state.selection.from,
              editor?.state.selection.to
            );

    console.log("selectedText", selectedText);
    if (!selectedText) {
      editor
      .chain()
      .focus()
      .insertContent(`<p>${url}</p>`)
      .extendMarkRange("link") 
      .setLink({ href: url })
      .run();
    } else {
      editor
      .chain()
      .focus()
      .extendMarkRange("link") 
      .setLink({ href: url })
      .run();
    }
   
  } else {
    editor.chain().focus().unsetLink().run(); 
  }
};
