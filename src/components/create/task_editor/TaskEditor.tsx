import React, { useContext } from 'react';
// styles
import  "./TaskEditor.scss";

// tiptap
import { EditorContent } from '@tiptap/react';

// context
import { TaskEditorContext } from '@/providers/text_editor/TaskEditor.context';


const TextEditor = (): JSX.Element | null => {
  const { editor } = useContext(TaskEditorContext);

  if (!editor) {
    return null;
  }

  return (
    <div className={"editor_container"}>
      <EditorContent editor={editor} className={"editor-content"} />
    </div>
  );
};

export default TextEditor;
