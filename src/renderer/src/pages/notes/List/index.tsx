import { Button } from '@arco-design/web-react';
import React, { useMemo } from 'react';

import { ReactComponent as NoContentIllu } from '@/assets/icons/no-content-illu.svg';
import { ActionItem } from '@/components/context-menu';
import PostList from '@/components/post-list';
import type { FolderItemData } from '@/interface';
import { useModelStore } from '@/models/post';

import BackHead from './back-head';
import FileItem from './file-item';
import FolderItem from './folder-item';

const ListSlider: React.FC = () => {
  const { createPost, createFolder, folderId, setFolderId, setPostId } = useModelStore();
  const group = useModelStore((state) => state.findFolderGroup(folderId));

  const rightMenu = useMemo<ActionItem[]>(
    () => [
      {
        key: 'create-md',
        title: '新建 Markdown',
        onClick: () => createPost(folderId),
      },
      {
        key: 'create-folder',
        title: '新建文件夹',
        onClick: () => createFolder(folderId),
      },
    ],
    [folderId],
  );

  const renderItem = (item: FolderItemData) => {
    if (item.type === 'folder')
      return <FolderItem key={item.id} id={item.id} onTitleClick={setFolderId} />;

    return <FileItem key={item.id} id={item.id} onClick={setPostId} />;
  };

  return (
    <PostList
      header={<BackHead />}
      dataSource={group}
      rightMenu={rightMenu}
      render={renderItem}
      noDataElement={
        <>
          <NoContentIllu className="opacity-40 text-[140px]" />
          <Button type="primary" onClick={() => createPost(folderId)}>
            新建笔记
          </Button>
        </>
      }
    />
  );
};

export default ListSlider;
