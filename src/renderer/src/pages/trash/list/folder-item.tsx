import { IconDelete, IconReply } from '@arco-design/web-react/icon';
import React, { useMemo } from 'react';

import FileItem from '@/components/file-item';
import IconButton from '@/components/icon-button';
import { useModelStore } from '@/models/post';
import { ActionItem } from '@/utils/menu-hoc';

import type { ItemProps } from './index';

const FolderItem: React.FC<ItemProps> = ({ id, keyword, active, onClick }) => {
  const { replyFolderFromTrash, delelteFolder } = useModelStore();
  const folder = useModelStore((state) => state.findFolder(id));

  if (!folder) return null;

  const actions = useMemo<ActionItem[]>(() => {
    return [
      {
        key: 'rename',
        title: '恢复',
        onClick: () => replyFolderFromTrash(folder.id),
      },
      {
        key: 'move',
        title: '永久删除',
        onClick: () => delelteFolder(folder.id),
      },
    ];
  }, [folder]);

  const renderSuffix = () => (
    <>
      <IconButton onClick={() => replyFolderFromTrash(folder.id)}>
        <IconReply />
      </IconButton>
      <IconButton onClick={() => delelteFolder(folder.id)}>
        <IconDelete />
      </IconButton>
    </>
  );

  return (
    <FileItem
      type="folder"
      title={folder.name}
      suffix={renderSuffix()}
      time={folder.date}
      keyword={keyword}
      rightMenu={actions}
      active={active}
      onClick={onClick}
    />
  );
};

export default FolderItem;
