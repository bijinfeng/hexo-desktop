import { Typography } from '@arco-design/web-react';
import { IconMinusCircle, IconSchedule } from '@arco-design/web-react/icon';
import { isEmpty } from 'lodash-es';
import React, { useContext } from 'react';

import IconButton from '@/components/icon-button';

import { SearchContext } from './context';
import Item from './item';

const SearchHistory: React.FC = () => {
  const { searchState, searchStorage, setSearchState } = useContext(SearchContext);
  const { query, clearQuery, deleteQuery } = searchStorage;

  if (isEmpty(query) || searchState.keyword || searchState.type) return null;

  return (
    <div className="px-3 pb-2">
      <div className="px-3 flex items-center justify-between my-2">
        <Typography.Text className="text-xs">搜索记录</Typography.Text>
        <IconButton onClick={clearQuery}>
          <Typography.Text className="text-xs">清空</Typography.Text>
        </IconButton>
      </div>
      {query.map((keyword) => (
        <Item
          key={keyword}
          preIcon={<IconSchedule />}
          subIcon={<IconMinusCircle fontSize={18} />}
          onSubClick={() => deleteQuery(keyword)}
          onClick={() => setSearchState({ keyword: keyword })}
        >
          {keyword}
        </Item>
      ))}
    </div>
  );
};

export default SearchHistory;
