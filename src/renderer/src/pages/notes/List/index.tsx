import { Button } from '@arco-design/web-react';
import React, { useCallback, useMemo, useState } from 'react';

import { ReactComponent as NoContentIllu } from '@/assets/icons/no-content-illu.svg';
import { ActionItem } from '@/components/context-menu';
import PostList, { PostListProps } from '@/components/post-list';
import { NoteItemProps, useNote } from '@/hooks/use-note';
import { useModelStore } from '@/models/post';

import BackHead from './back-head';
import FileItem from './file-item';
import FolderItem from './folder-item';

export interface ItemProps extends NoteItemProps {
  keyword?: string;
  couldCreate?: boolean;
}

const List: React.FC = () => {
  const { folderId, renderItem } = useNote();
  // 搜索关键词
  const [keyword, setKeyword] = useState('');
  // 搜索范围
  const [scope, setScope] = useState('');
  const { createPost, createFolder } = useModelStore();
  const folder = useModelStore((state) => state.findFolder(folderId));
  const group = useModelStore((state) =>
    state.findFolderGroup({ folderId, keyword, scope }),
  );

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

  const scopes = useMemo<PostListProps['scopes']>(() => {
    if (!folder) return undefined;
    return [
      { key: folder.id, label: folder.name },
      { key: '', label: '全部笔记' },
    ];
  }, [folder]);

  const handleSearch = useCallback<PostListProps['onSearchChange']>((keyword, scope) => {
    setKeyword(keyword);
    setScope(scope);
  }, []);

  const render = useCallback(
    renderItem({
      folder: (params) => <FolderItem {...params} key={params.id} keyword={keyword} />,
      post: (params) => <FileItem {...params} key={params.id} keyword={keyword} />,
    }),
    [keyword],
  );

  return (
    <PostList
      header={<BackHead folder={folder} />}
      dataSource={group}
      rightMenu={rightMenu}
      render={render}
      noDataElement={
        <>
          <NoContentIllu className="opacity-40 text-[140px]" />
          <Button type="primary" onClick={() => createPost(folderId)}>
            新建笔记
          </Button>
        </>
      }
      scopes={scopes}
      onSearchChange={handleSearch}
    />
  );
};

export default List;
