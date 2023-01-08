import { Divider, Typography } from '@arco-design/web-react';
import { IconSearch } from '@arco-design/web-react/icon';
import React, { useContext } from 'react';

import AttachIcon from '../attach-icon';
import { SearchContext } from './context';
import Item from './item';

const SearchResult: React.FC = () => {
  const { searchState, searchList } = useContext(SearchContext);

  if (!searchState.keyword) return null;

  console.log(searchList);

  return (
    <div>
      <div className="px-3 py-2">
        {searchList.map((item) => (
          <Item
            key={item.id}
            preIcon={<AttachIcon size={32} imgUrl={item.imgUrl} type={item.fileType} />}
          >
            <Typography.Text>{item.fileName}</Typography.Text>
          </Item>
        ))}
      </div>
      <Divider className="!m-0" />
      <div className="px-3 py-2">
        <Item preIcon={<IconSearch />}>
          <span className="flex items-center justify-between">
            查看 {searchState.keyword} 的所有搜索结果
            <Typography.Text type="secondary">Shift + Enter</Typography.Text>
          </span>
        </Item>
      </div>
    </div>
  );
};

export default SearchResult;
