import { IconFindReplace, IconMore } from '@arco-design/web-react/icon';
import React, { useMemo, useRef, useState } from 'react';

import ActionDropdown, { ActionItem } from '@/components/action-dropdown';
import Editors from '@/components/editor';
import type { MarkdownEditorFunc } from '@/components/editor/markdown';
import FileTag from '@/components/file-tag';
import IconButton from '@/components/icon-button';
import Illus from '@/components/illus';
import { useModelStore } from '@/models/post';

interface EditorProps {
  postId: string;
}

const Editor: React.FC<EditorProps> = ({ postId }) => {
  const { addPostTag, removePostTag, updatePostTitle, updatePostContent } =
    useModelStore();
  const post = useModelStore((state) => state.getPost(postId));
  const postTags = useModelStore((state) => state.getPostTags(postId));
  const [showTag, setShowTag] = useState<boolean>(false);
  const markdownRef = useRef<MarkdownEditorFunc>(null);

  const editorActions = useMemo<ActionItem[]>(
    () => [
      { key: 'add_tag', title: '标签', onClick: () => setShowTag(true) },
      { key: 'move', title: '移动到' },
    ],
    [],
  );

  const renderTitleSuffix = () => (
    <>
      <IconButton onClick={() => markdownRef.current?.search()}>
        <IconFindReplace fontSize={22} />
      </IconButton>
      <ActionDropdown actions={editorActions}>
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

  const renderContent = () => {
    if (!post) return <Illus.Empty />;
    return (
      <Editors
        key={postId}
        title={post.title}
        titleSuffix={renderTitleSuffix()}
        onTitleChange={(title) => updatePostTitle(post.id, title)}
      >
        {renderTags()}
        <Editors.Markdown
          ref={markdownRef}
          value={post.content}
          onChange={(content) => updatePostContent(post.id, content)}
        />
      </Editors>
    );
  };

  return <div className="h-full bg-bg-1">{renderContent()}</div>;
};

export default Editor;
