import { IconDelete, IconReply } from '@arco-design/web-react/icon';
import React, { useMemo } from 'react';

import FileItem from '@/components/file-item';
import IconButton from '@/components/icon-button';
import { useModelStore } from '@/models/post';
import { ActionItem } from '@/utils/menu-hoc';

export interface ItemProps {
  id: string;
  active: boolean;
  onClick: () => void;
}

const Item: React.FC<ItemProps> = ({ id, active, onClick }) => {
  const { replyPostFromTrash, deletePost } = useModelStore();
  const post = useModelStore((state) => state.getPost(id));

  if (!post) return null;

  const actions = useMemo<ActionItem[]>(() => {
    return [
      {
        key: 'rename',
        title: '恢复',
        onClick: () => replyPostFromTrash(post.id),
      },
      {
        key: 'move',
        title: '永久删除',
        onClick: () => deletePost(post.id),
      },
    ];
  }, [post]);

  const renderSuffix = () => (
    <>
      <IconButton onClick={() => replyPostFromTrash(post.id)}>
        <IconReply />
      </IconButton>
      <IconButton onClick={() => deletePost(post.id)}>
        <IconDelete />
      </IconButton>
    </>
  );

  return (
    <FileItem
      type={post.type}
      title={post.title}
      time={post.date}
      active={active}
      rightMenu={actions}
      suffix={renderSuffix()}
      onClick={onClick}
    />
  );
};

export default Item;
