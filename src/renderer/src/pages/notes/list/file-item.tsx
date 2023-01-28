import React, { useCallback, useMemo, useState } from 'react';

import FileItem from '@/components/file-item';
import { fileMove } from '@/components/file-move';
import { ActionItem } from '@/components/menu';
import { useModelStore } from '@/models/post';

import { deleteConfirm } from './delete-confirm';
import type { ItemProps } from './index';

const Item: React.FC<ItemProps> = ({ id, keyword, active, couldCreate, onClick }) => {
  const { updatePostTitle, collect, cancelCollect, movePostToTrash } = useModelStore();
  const post = useModelStore((state) => state.getPost(id));
  const [nameEditable, setNameEditable] = useState(false);

  if (!post) return null;

  const createAction = useMemo<ActionItem[]>(() => {
    if (!couldCreate) return [];
    return [
      {
        key: 'create',
        title: '新建',
      },
      { type: 'divider' },
    ];
  }, [couldCreate]);

  const collectAction = useMemo<ActionItem>(() => {
    if (post.collect) {
      return {
        key: 'cancel-collect',
        title: '取消收藏',
        onClick: () => cancelCollect(post.id),
      };
    }
    return {
      key: 'collect',
      title: '收藏',
      onClick: () => collect(post.id),
    };
  }, [post.collect]);

  const actions = useMemo<ActionItem[]>(() => {
    return [
      ...createAction,
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
  }, [createAction, collectAction, post]);

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
      keyword={keyword}
      nameEditable={nameEditable}
      actions={actions}
      rightMenu={actions}
      active={active}
      onClick={onClick}
      onNameChange={onNameChange}
    />
  );
};

export default Item;
