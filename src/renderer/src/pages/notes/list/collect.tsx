import React, { useState } from 'react';

import PostList from '@/components/post-list';
import { useNote } from '@/hooks/use-note';
import { useModelStore } from '@/models/post';

import FileItem from './file-item';
import FolderItem from './folder-item';

const CollectList: React.FC = () => {
  const { renderItem } = useNote();
  const [keyword, setKeyword] = useState('');
  const group = useModelStore((state) => state.findCollect(keyword));

  return (
    <PostList
      dataSource={group}
      render={renderItem({
        folder: (params) => (
          <FolderItem {...params} key={params.id} couldCreate={false} keyword={keyword} />
        ),
        post: (params) => (
          <FileItem {...params} key={params.id} couldCreate={false} keyword={keyword} />
        ),
      })}
      noDataElement="当前暂无收藏文章"
      onSearchChange={setKeyword}
    />
  );
};

export default CollectList;
