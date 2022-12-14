import { Input, Tag } from '@arco-design/web-react';
import { IconCloseCircle, IconSubscribed } from '@arco-design/web-react/icon';
import React, { useState } from 'react';

import IconButton from '@/components/icon-button';

interface FileTagProps {
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  onClose?: () => void;
}

const FileTag: React.FC<FileTagProps> = ({ tags, addTag, removeTag, onClose }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddTag = () => {
    if (inputValue) {
      !tags.includes(inputValue) && addTag(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="group flex items-center gap-[10px] px-[15px] border-t border-t-border">
      <div className="flex-1 flex items-center gap-[10px]">
        <IconSubscribed fontSize={18} />
        <div className="flex gap-[10px] py-[5px] shrink overflow-x-overlay webkit-scrollbar-h-3">
          {tags.map((tag) => (
            <Tag key={tag} closable onClose={() => removeTag(tag)}>
              {tag}
            </Tag>
          ))}
        </div>
        <Input
          size="mini"
          placeholder="输入后按回车键"
          value={inputValue}
          className="!w-[112px] !my-[5px]"
          onPressEnter={handleAddTag}
          onBlur={handleAddTag}
          onChange={setInputValue}
        />
      </div>
      <IconButton className="hidden group-hover:block" onClick={onClose}>
        <IconCloseCircle fontSize={18} />
      </IconButton>
    </div>
  );
};

export default FileTag;
