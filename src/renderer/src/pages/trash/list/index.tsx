import React from 'react';

import PostList from '@/components/post-list';
import { useModelStore } from '@/models/post';

import FileItem from './file-item';
import FolderItem from './folder-item';

const ListSlider: React.FC = () => {
  const trashList = useModelStore((state) => state.findTrash());

  const renderItem = (item: typeof trashList[0]) => {
    if (item.isFolder) return <FolderItem key={item.id} id={item.id} />;

    return <FileItem key={item.id} id={item.id} />;
  };

  return (
    <PostList dataSource={trashList} render={renderItem} noDataElement="回收站为空" />
  );
};

export default ListSlider;
