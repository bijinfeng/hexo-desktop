import React, { useMemo } from 'react';

import MarkdownEditor from '@/components/markdown-editor';
import { useModelStore } from '@/models/post';

import Empty from './Empty';

interface EditorProps {
  postId?: string;
}

const Editor: React.FC<EditorProps> = ({ postId }) => {
  const postList = useModelStore((state) => state.models.Post);
  const post = useMemo(() => postList.find((it) => it.id === postId), [postList, postId]);

  if (!post) return <Empty />;

  return <MarkdownEditor post={post} />;
};

export default Editor;
