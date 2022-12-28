import React, { useCallback, useMemo, useState } from 'react';

import FileItem from '@/components/file-item';
import { fileMove } from '@/components/file-move';
import { useModelStore } from '@/models/post';
import { ActionItem } from '@/utils/menu-hoc';

import { deleteConfirm } from './delete-confirm';

export interface ItemProps {
  id: string;
  onTitleClick: (id: string) => void;
}

const FolderItem: React.FC<ItemProps> = ({ id, onTitleClick }) => {
  const { updateFolderName, createFolder, createPost, moveFolderToTrash } =
    useModelStore();
  const folder = useModelStore((state) => state.findFolder(id));
  const [nameEditable, setNameEditable] = useState(false);

  if (!folder) return null;

  const actions = useMemo<ActionItem[]>(() => {
    return [
      {
        key: 'create',
        title: '新建',
        children: [
          {
            key: 'create-markdown',
            title: 'Markdown',
            onClick: () => {
              createPost(folder.id);
            },
          },
          {
            key: 'create-folder',
            title: '文件夹',
            onClick: () => {
              createFolder(folder.id);
            },
          },
        ],
      },
      { type: 'divider' },
      {
        key: 'delete',
        title: '删除',
        onClick: deleteConfirm(() => moveFolderToTrash(folder.id)),
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
    updateFolderName(folder.id, newName);
    setNameEditable(false);
  }, []);

  return (
    <FileItem
      type="folder"
      title={folder.name}
      time={folder.date}
      actions={actions}
      rightMenu={actions}
      nameEditable={nameEditable}
      onNameChange={onNameChange}
      onTitleClick={() => onTitleClick(id)}
    />
  );
};

export default FolderItem;
