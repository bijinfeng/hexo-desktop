import React, { useCallback, useMemo, useState } from 'react';

import FileItem from '@/components/file-item';
import { fileMove } from '@/components/file-move';
import { useModelStore } from '@/models/post';
import { ActionItem } from '@/utils/menu-hoc';

import { deleteConfirm } from './delete-confirm';

export interface ItemProps {
  id: string;
  onClick: (id: string) => void;
}

const Item: React.FC<ItemProps> = ({ id, onClick }) => {
  const { updatePostTitle, collect, cancelCollect, movePostToTrash } = useModelStore();
  const post = useModelStore((state) => state.getPost(id));
  const currentPostId = useModelStore((state) => state.postId);
  const [nameEditable, setNameEditable] = useState(false);

  if (!post) return null;

  const actions = useMemo<ActionItem[]>(() => {
    const collectAction: ActionItem = post.collect
      ? {
          key: 'cancel-collect',
          title: '取消收藏',
          onClick: () => cancelCollect(post.id),
        }
      : {
          key: 'collect',
          title: '收藏',
          onClick: () => collect(post.id),
        };

    return [
      {
        key: 'create',
        title: '新建',
      },
      { type: 'divider' },
      {
        key: 'delete',
        title: '删除',
        onClick: deleteConfirm(() => movePostToTrash(post.id)),
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
      { type: 'divider' },
      collectAction,
    ];
  }, [post]);

  const onNameChange = useCallback((newName: string) => {
    updatePostTitle(post.id, newName);
    setNameEditable(false);
  }, []);

  return (
    <FileItem
      type={post.type}
      title={post.title}
      time={post.date}
      collect={post.collect}
      nameEditable={nameEditable}
      actions={actions}
      rightMenu={actions}
      active={post.id === currentPostId}
      onClick={() => onClick(id)}
      onNameChange={onNameChange}
    />
  );
};

export default Item;
