import React, { useState } from 'react';

import PostList from '@/components/post-list';
import { NoteItemProps, useNote } from '@/hooks/use-note';
import { useModelStore } from '@/models/post';

import FileItem from './file-item';
import FolderItem from './folder-item';

export interface ItemProps extends NoteItemProps {
  keyword?: string;
}

const List: React.FC = () => {
  const { renderItem } = useNote();
  const [keyword, setKeyword] = useState<string>();
  const trashList = useModelStore((state) => state.findTrash(keyword));

  return (
    <PostList
      dataSource={trashList}
      render={renderItem({
        folder: (params) => <FolderItem {...params} key={params.id} keyword={keyword} />,
        post: (params) => <FileItem {...params} key={params.id} keyword={keyword} />,
      })}
      noDataElement="回收站为空"
      onSearchChange={setKeyword}
    />
  );
};

export default List;
