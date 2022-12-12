import { Input } from '@arco-design/web-react';
import { IconFindReplace, IconMore } from '@arco-design/web-react/icon';
import React from 'react';

import { ReactComponent as MdSwitch } from '@/assets/icons/md-switch.svg';
import ActionDropdown, { ActionItem } from '@/components/action-dropdown';
import FileTag from '@/components/file-tag';
import IconButton from '@/components/icon-button';
import type { PostData } from '@/interface';

import Markdown from './markdown';

const actions: ActionItem[] = [
  { key: '1', title: '分屏编辑' },
  { key: '2', title: '所见即所得' },
  { key: '3', title: '预览模式' },
];

interface MarkdownEditorProps {
  post: PostData;
  postTags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = (props) => {
  const { post, postTags, addTag, removeTag, onTitleChange, onContentChange } = props;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-[15px] py-[20px] px-[15px]">
        <Input
          className="flex-1 !bg-transparent !border-none !p-0 !leading-[32px] !text-[20px] font-medium"
          value={post.title}
          onChange={onTitleChange}
        />
        <ActionDropdown actions={actions}>
          <MdSwitch className="arco-icon" fontSize={22} />
        </ActionDropdown>
        <IconButton>
          <IconFindReplace fontSize={22} />
        </IconButton>
        <IconButton>
          <IconMore fontSize={22} />
        </IconButton>
      </div>
      <FileTag tags={postTags} addTag={addTag} removeTag={removeTag} />
      <div className="flex-1">
        <Markdown value={post.content} onChange={onContentChange} />
      </div>
    </div>
  );
};

export default MarkdownEditor;
