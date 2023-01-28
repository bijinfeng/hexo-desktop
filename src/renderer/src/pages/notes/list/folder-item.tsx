import React, { useCallback, useMemo, useState } from 'react';

import FileItem from '@/components/file-item';
import { fileMove } from '@/components/file-move';
import { ActionItem } from '@/components/menu';
import { useNote } from '@/hooks/use-note';
import { useModelStore } from '@/models/post';

import { deleteConfirm } from './delete-confirm';
import type { ItemProps } from './index';

const FolderItem: React.FC<ItemProps> = ({
  id,
  keyword,
  couldCreate,
  active,
  onClick,
}) => {
  const { setFolderId } = useNote();
  const { updateFolderName, createFolder, createPost, moveFolderToTrash } =
    useModelStore();
  const folder = useModelStore((state) => state.findFolder(id));
  const [nameEditable, setNameEditable] = useState(false);

  if (!folder) return null;

  const createAction = useMemo<ActionItem[]>(() => {
    if (!couldCreate) return [];
    return [
      {
        key: 'create',
        title: '新建',
        children: [
          {
            key: 'create-markdown',
            title: 'Markdown',
            onClick: () => createPost(folder.id),
          },
          {
            key: 'create-folder',
            title: '文件夹',
            onClick: () => createFolder(folder.id),
          },
        ],
      },
      { type: 'divider' },
    ];
  }, [couldCreate]);

  const actions = useMemo<ActionItem[]>(() => {
    return [
      ...createAction,
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
  }, [folder, createAction]);

  const onNameChange = useCallback((newName: string) => {
    updateFolderName(folder.id, newName);
    setNameEditable(false);
  }, []);

  return (
    <FileItem
      type="folder"
      title={folder.name}
      time={folder.date}
      keyword={keyword}
      actions={actions}
      rightMenu={actions}
      nameEditable={nameEditable}
      onNameChange={onNameChange}
      active={active}
      onTitleClick={() => setFolderId(id)}
      onClick={onClick}
    />
  );
};

export default FolderItem;
