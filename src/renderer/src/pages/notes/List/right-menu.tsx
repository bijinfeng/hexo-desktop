import React, { memo, useCallback } from 'react';

import ContextMenu, { ActionItem } from '@/components/context-menu';
import { useModelStore } from '@/models/post';

const actions: ActionItem[] = [
  {
    key: 'create-md',
    title: '新建 Markdown',
  },
  {
    key: 'create-folder',
    title: '新建文件夹',
  },
];

export interface RightMenuProps {
  children: React.ReactNode;
  folderId?: string;
}

const RightMenu: React.FC<RightMenuProps> = ({ children, folderId }) => {
  const { createFolder, createPost } = useModelStore();

  const handleClick = useCallback(
    (key: string) => {
      if (key === 'create-folder') {
        createFolder(folderId);
      } else if (key === 'create-md') {
        createPost(folderId);
      }
    },
    [folderId],
  );

  return (
    <ContextMenu actions={actions} onClickMenuItem={handleClick}>
      {children}
    </ContextMenu>
  );
};

export default memo(RightMenu);
