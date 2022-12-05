import React, { useMemo } from 'react';

import FileItem from '@/components/file-item';
import { useModelStore } from '@/models/post';

export interface ItemProps {
  id: string;
  onClick: (id: string) => void;
}

const Item: React.FC<ItemProps> = ({ id, onClick }) => {
  const postList = useModelStore((state) => state.models.Post);

  const post = useMemo(() => postList.find((it) => it.id === id), [id, postList]);

  if (!post) return null;

  return (
    <FileItem
      type={post.type}
      title={post.title}
      time={post.date}
      onClick={() => onClick(id)}
    />
  );
};

export default Item;
