import React from 'react';

import PostList from '@/components/post-list';
import { useModelStore } from '@/models/post';

import FileItem from './file-item';
import FolderItem from './folder-item';

export interface ListProps {
  postId?: string;
  setPostId: (postId: string) => void;
}

const List: React.FC<ListProps> = ({ postId, setPostId }) => {
  const trashList = useModelStore((state) => state.findTrash());

  const renderItem = (item: typeof trashList[0]) => {
    switch (item.type) {
      case 'folder':
        return <FolderItem key={item.id} id={item.id} />;

      case 'post':
        return (
          <FileItem
            key={item.id}
            id={item.id}
            active={postId === item.id}
            onClick={() => setPostId(item.id)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <PostList dataSource={trashList} render={renderItem} noDataElement="回收站为空" />
  );
};

export default List;
