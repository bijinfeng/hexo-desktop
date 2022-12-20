import React, { useCallback, useMemo, useState } from 'react';

import FileItem from '@/components/file-item';
import { fileMove } from '@/components/file-move';
import { useModelStore } from '@/models/post';
import { ActionItem } from '@/utils/menu-hoc';

export interface ItemProps {
  id: string;
  onClick: (id: string) => void;
}

const Item: React.FC<ItemProps> = ({ id, onClick }) => {
  const { updatePostTitle } = useModelStore();
  const postList = useModelStore((state) => state.models.Post);
  const [nameEditable, setNameEditable] = useState(false);

  const post = useMemo(() => postList.find((it) => it.id === id), [id, postList]);

  if (!post) return null;

  const actions = useMemo<ActionItem[]>(() => {
    return [
      {
        key: 'create',
        title: '新建',
      },
      { type: 'divider' },
      {
        key: 'delete',
        title: '删除',
      },
      { type: 'divider' },
      {
        key: 'rename',
        title: '重命名',
        onClick: () => setNameEditable(true),
      },
      {
        key: 'move',
        title: '移动到',
        onClick: () => fileMove(),
      },
    ];
  }, []);

  const onNameChange = useCallback((newName: string) => {
    updatePostTitle(post.id, newName);
    setNameEditable(false);
  }, []);

  return (
    <FileItem
      type={post.type}
      title={post.title}
      time={post.date}
      nameEditable={nameEditable}
      actions={actions}
      onClick={() => onClick(id)}
      onNameChange={onNameChange}
    />
  );
};

export default Item;
