import { Modal } from '@arco-design/web-react';
import { IconSearch } from '@arco-design/web-react/icon';
import React, { useState } from 'react';

import IconButton from '@/components/icon-button';

import { SearchProvider } from './context';
import SearchHistory from './history';
import SearchInput from './input';
import SearchResult from './result';
import FileType from './types';

const Search: React.FC = () => {
  const [visible, setVisible] = useState(false);

  return (
    <SearchProvider>
      <IconButton onClick={() => setVisible(true)}>
        <IconSearch fontSize={20} />
      </IconButton>
      <Modal
        visible={visible}
        closable={false}
        focusLock
        title={null}
        footer={null}
        onCancel={() => setVisible(false)}
        className="!rounded-lg !top-20 !p-0 modal-clear-padding"
        style={{ width: 600 }}
        alignCenter={false}
      >
        <SearchInput onClose={() => setVisible(false)} />
        <SearchResult />
        <FileType />
        <SearchHistory />
      </Modal>
    </SearchProvider>
  );
};

export default Search;
