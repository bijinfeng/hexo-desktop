import { IconFindReplace, IconMore } from '@arco-design/web-react/icon';
import React, { useState } from 'react';

import ActionDropdown from '@/components/action-dropdown';
import Editors from '@/components/editor';
import FileTag from '@/components/file-tag';
import IconButton from '@/components/icon-button';
import Illus from '@/components/illus';
import { AppEventManager, EventType } from '@/event';
import { useModelStore } from '@/models/post';

import { EditorActions, editorActions } from './const';

interface EditorProps {
  postId: string;
}

const Editor: React.FC<EditorProps> = ({ postId }) => {
  const { addPostTag, removePostTag, updatePostTitle, updatePostContent } =
    useModelStore();
  const post = useModelStore((state) => state.getPost(postId));
  const postTags = useModelStore((state) => state.getPostTags(postId));
  const [showTag, setShowTag] = useState<boolean>(false);

  if (!post) return <Illus.Empty />;

  const handleAction = (key: string) => {
    if (key === EditorActions.ADD_TAG) {
      setShowTag(true);
    }
  };

  const renderTitleSuffix = () => (
    <>
      <IconButton onClick={() => AppEventManager.emit(EventType.VISIBLE_FILE_SEARCH)}>
        <IconFindReplace fontSize={22} />
      </IconButton>
      <ActionDropdown actions={editorActions} onClickMenuItem={handleAction}>
        <IconMore fontSize={22} />
      </ActionDropdown>
    </>
  );

  const renderTags = () => {
    if (!showTag) return null;

    return (
      <FileTag
        tags={postTags}
        addTag={(tag) => addPostTag(postId, tag)}
        removeTag={(tag) => removePostTag(postId, tag)}
        onClose={() => setShowTag(false)}
      />
    );
  };

  return (
    <Editors
      key={postId}
      title={post.title}
      content={post.content}
      titleSuffix={renderTitleSuffix()}
      onTitleChange={(title) => updatePostTitle(post.id, title)}
      onContentChange={(content) => updatePostContent(post.id, content)}
    >
      {renderTags()}
    </Editors>
  );
};

const EditorWrapper: React.FC = () => {
  const { postId } = useModelStore();

  return (
    <div className="h-full bg-bg-1">
      {postId ? <Editor postId={postId} /> : <Illus.Empty />}
    </div>
  );
};

export default EditorWrapper;
