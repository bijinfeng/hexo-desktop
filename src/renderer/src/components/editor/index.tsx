import { Input } from '@arco-design/web-react';
import { IconFindReplace, IconMore } from '@arco-design/web-react/icon';
import React, { useState } from 'react';

import ActionDropdown from '@/components/action-dropdown';
import FileTag from '@/components/file-tag';
import IconButton from '@/components/icon-button';
import { AppEventManager, EventType } from '@/event';
import type { PostData } from '@/interface';

import { EditorActions, editorActions } from './const';
import Markdown from './markdown';

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
  const [showTag, setShowTag] = useState<boolean>(false);

  const handleAction = (key: string) => {
    if (key === EditorActions.ADD_TAG) {
      setShowTag(true);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-[15px] py-[20px] px-[15px]">
        <Input
          className="flex-1 !bg-transparent !border-none !p-0 !leading-[32px] !text-[20px] font-medium"
          value={post.title}
          onChange={onTitleChange}
        />
        <IconButton onClick={() => AppEventManager.emit(EventType.VISIBLE_FILE_SEARCH)}>
          <IconFindReplace fontSize={22} />
        </IconButton>
        <ActionDropdown actions={editorActions} onClickMenuItem={handleAction}>
          <IconMore fontSize={22} />
        </ActionDropdown>
      </div>
      {showTag && (
        <FileTag
          tags={postTags}
          addTag={addTag}
          removeTag={removeTag}
          onClose={() => setShowTag(false)}
        />
      )}
      <Markdown value={post.content} onChange={onContentChange} />
    </div>
  );
};

export default MarkdownEditor;
