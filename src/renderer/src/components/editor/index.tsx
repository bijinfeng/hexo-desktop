import { Input } from '@arco-design/web-react';
import React from 'react';

import Folder from './folder';
import Markdown from './markdown';

interface EditorProps {
  title: string;
  editable?: boolean;
  titleSuffix?: React.ReactNode;
  children?: React.ReactNode;
  onTitleChange?: (title: string) => void;
}

const EditorInner: React.FC<EditorProps> = (props) => {
  const { title, titleSuffix, children, editable = true, onTitleChange } = props;

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
    </div>
  );
};

const Editor = Object.assign(EditorInner, { Markdown, Folder });

export default Editor;
