import { Input } from '@arco-design/web-react';
import React from 'react';

import Markdown from './markdown';

interface MarkdownEditorProps {
  title: string;
  content: string;
  editable?: boolean;
  titleSuffix?: React.ReactNode;
  children?: React.ReactNode;
  onTitleChange?: (title: string) => void;
  onContentChange?: (content: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = (props) => {
  const {
    title,
    content,
    titleSuffix,
    children,
    editable = true,
    onTitleChange,
    onContentChange,
  } = props;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-[15px] py-[20px] px-[15px]">
        <Input
          className="flex-1 !bg-transparent !border-none !p-0 !leading-[32px] !text-[20px] font-medium"
          value={title}
          readOnly={!editable}
          onChange={onTitleChange}
        />
        {titleSuffix}
      </div>
      {children}
      <Markdown value={content} editable={editable} onChange={onContentChange} />
    </div>
  );
};

export default MarkdownEditor;
