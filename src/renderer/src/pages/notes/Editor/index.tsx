import React from 'react';

import MarkdownEditor from '@/components/markdown-editor';
import { useModelStore } from '@/models/post';

import Empty from './Empty';

interface EditorProps {
  postId: string;
}

const Editor: React.FC<EditorProps> = ({ postId }) => {
  const { addPostTag, removePostTag, updatePostTitle, updatePostContent } =
    useModelStore();
  const post = useModelStore((state) => state.getPost(postId));
  const postTags = useModelStore((state) => state.getPostTags(postId));

  if (!post) return <Empty />;

  return (
    <MarkdownEditor
      post={post}
      postTags={postTags}
      addTag={(tag) => addPostTag(postId, tag)}
      removeTag={(tag) => removePostTag(postId, tag)}
      onTitleChange={(title) => updatePostTitle(post.id, title)}
      onContentChange={(content) => updatePostContent(post.id, content)}
    />
  );
};

const EditorWrapper: React.FC<Partial<EditorProps>> = ({ postId }) => {
  if (!postId) return <Empty />;

  return <Editor postId={postId} />;
};

export default EditorWrapper;
