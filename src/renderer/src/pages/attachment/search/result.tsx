import { Divider, Typography } from '@arco-design/web-react';
import { IconSearch } from '@arco-design/web-react/icon';
import { useKeyPress } from 'ahooks';
import { isEmpty } from 'lodash-es';
import React, { useContext } from 'react';

import AttachIcon from '../attach-icon';
import { AttchmentContext } from '../context';
import { SearchContext } from './context';
import Item from './item';

interface SearchResultProps {
  onClose: () => void;
}

const SearchResult: React.FC<SearchResultProps> = ({ onClose }) => {
  const { searchState, searchList, searchStorage } = useContext(SearchContext);
  const { onSearch } = useContext(AttchmentContext);

  useKeyPress(['shift.enter'], () => {
    if (searchState.keyword) {
      searchStorage.setQuery(searchState.keyword);
      onSearch(searchState.keyword, searchState.type);
      onClose();
    }
  });

  if (searchState.type && !searchState.keyword) return <div className="pb-3" />;

  if (!searchState.keyword) return null;

  return (
    <div>
      {!isEmpty(searchList) && (
        <div className="px-3 py-2">
          {searchList.map((item) => (
            <Item
              key={item.id}
              preIcon={
                <AttachIcon
                  fit="cover"
                  size={32}
                  imgUrl={item.imgUrl}
                  type={item.fileType}
                />
              }
            >
              <Typography.Text className="truncate">{item.fileName}</Typography.Text>
            </Item>
          ))}
        </div>
      )}
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
