import React, { useCallback, useMemo, useState } from 'react';

import FileItem from '@/components/file-item';
import { fileMove } from '@/components/file-move';
import { useModelStore } from '@/models/post';
import { ActionItem } from '@/utils/menu-hoc';

export interface ItemProps {
  id: string;
  onTitleClick: (id: string) => void;
}

const FolderItem: React.FC<ItemProps> = ({ id, onTitleClick }) => {
  const { updateFolderName, createFolder, createPost } = useModelStore();
  const folderList = useModelStore((state) => state.models.Folder);
  const [nameEditable, setNameEditable] = useState(false);

  const folder = useMemo(() => folderList.find((it) => it.id === id), [id, folderList]);

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
      nameEditable={nameEditable}
      onNameChange={onNameChange}
      onTitleClick={() => onTitleClick(id)}
    />
  );
};

export default FolderItem;
