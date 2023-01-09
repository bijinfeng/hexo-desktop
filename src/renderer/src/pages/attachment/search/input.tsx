import { Divider, Input, Typography } from '@arco-design/web-react';
import { IconClose } from '@arco-design/web-react/icon';
import React, { useContext } from 'react';

import IconButton from '@/components/icon-button';

import { SearchContext } from './context';
import { fileTypes } from './types';

interface SearchInputProps {
  onClose: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onClose }) => {
  const { searchState, setSearchState } = useContext(SearchContext);

  const couldClear = searchState.keyword || searchState.type;

  const renderFileTag = () => {
    const fileTag = fileTypes.find((it) => it.type === searchState.type);
    if (!fileTag) return null;

    return (
      <IconButton
        active
        className="!whitespace-nowrap !text-lg !leading-6 px-1 text-primary-6"
      >
        {fileTag.name}：
      </IconButton>
    );
  };

  return (
    <div className="flex items-center pl-3 pr-6 pt-5 pb-2">
      {renderFileTag()}
      <Input
        placeholder="搜索文件"
        className="!border-none !bg-transparent !text-lg font-medium"
        value={searchState.keyword}
        onChange={(keyword) => setSearchState({ keyword })}
      />
      {couldClear && (
        <>
          <IconButton onClick={() => setSearchState({ keyword: '', type: '' })}>
            <Typography.Text className="text-xs !whitespace-nowrap">清空</Typography.Text>
          </IconButton>
          <Divider type="vertical" className="!ml-3 !mr-0" />
        </>
      )}

      <IconButton className="ml-3" onClick={onClose}>
        <IconClose fontSize={18} />
      </IconButton>
    </div>
  );
};

export default SearchInput;
