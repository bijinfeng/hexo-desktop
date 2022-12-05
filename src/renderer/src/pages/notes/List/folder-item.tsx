import React, { useMemo } from 'react';

import FileItem from '@/components/file-item';
import { useModelStore } from '@/models/post';

export interface ItemProps {
  id: string;
  onTitleClick: (id: string) => void;
}

const FolderItem: React.FC<ItemProps> = ({ id, onTitleClick }) => {
  const folderList = useModelStore((state) => state.models.Folder);

  const folder = useMemo(() => folderList.find((it) => it.id === id), [id, folderList]);

  if (!folder) return null;

  return (
    <FileItem
      type="folder"
      title={folder.name}
      time={folder.date}
      onTitleClick={() => onTitleClick(id)}
    />
  );
};

export default FolderItem;
