import './style/index.less';

import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Table from '@tiptap/extension-table';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useMemo, useRef } from 'react';

import { MarkdownContext, MarkdownState } from './context';
import TableCell from './extensions/table-cell';
import FindReplace from './find-replace';
import MenuBar from './menu-bar';

export interface MarkdownEditorProps {
  value: string;
  editable?: boolean;
  onChange?: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = (props) => {
  const { value, editable = true, onChange } = props;
  const contentRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    editable,
    extensions: [
      StarterKit,
      Underline,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({
        placeholder: 'Write something …',
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Color,
      TextStyle,
      Highlight,
    ],
    content: value,
    autofocus: true,
    editorProps: {
      attributes: {
        class: 'min-h-full p-5',
      },
    },
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  const markdownState = useMemo<MarkdownState>(() => ({ editor: editor! }), [editor]);

  if (!editor) return null;

  return (
    <MarkdownContext.Provider value={markdownState}>
      <div className="flex flex-col flex-1 overflow-hidden">
        {editable && <MenuBar />}
        <div
          ref={contentRef}
          className="flex-1 relative overflow-y-hidden border-t border-t-border"
        >
          <EditorContent
            className="h-full overflow-y-auto markdown-editor-placeholder"
            editor={editor}
          />
          <FindReplace nodeRef={contentRef} />
        </div>
      </div>
    </MarkdownContext.Provider>
  );
};

export default React.memo(MarkdownEditor);
