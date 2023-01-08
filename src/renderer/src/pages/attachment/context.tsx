import { useSetState } from 'ahooks';
import React, { useCallback, useState } from 'react';

import { SearchState, SorterResult, usePicgoStore } from '@/models/picgo';

import type { AttachmentListProps } from './interface';

export type { SortDirection, SorterResult } from '@/models/picgo';

export interface AttachmentState extends AttachmentListProps {
  onDelete: (ids: (string | number)[]) => void;
  onChangeAll: (checked: boolean) => void;
  searchState: SearchState;
  onSearch: (keyword: string, type?: string) => void;
  sorter?: SorterResult;
  setSorter: (sorter: SorterResult) => void;
}

export const AttchmentContext = React.createContext<AttachmentState>(
  {} as AttachmentState,
);

export const AttachmentProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [searchState, setSearchState] = useSetState<SearchState>({ keyword: '' });
  const [sorter, setSorter] = useState<SorterResult>({
    field: 'date',
    direction: 'descend',
  });
  const { deleteAttachment } = usePicgoStore();
  const attachments = usePicgoStore((state) =>
    state.searchAttachment(searchState, sorter),
  );
  const [selectedKeys, setSelectedKeys] = useState<Array<string | number>>([]);

  const onChangeAll = useCallback(
    (checked: boolean) => {
      setSelectedKeys(checked ? attachments.map((it) => it.id) : []);
    },
    [attachments],
  );

  const onDelete = useCallback<AttachmentState['onDelete']>((ids) => {
    deleteAttachment(ids);
  }, []);

  const onSearch = useCallback<AttachmentState['onSearch']>((keyword, type) => {
    setSearchState({ keyword, type });
  }, []);

  return (
    <AttchmentContext.Provider
      value={{
        searchState,
        data: attachments,
        selectedKeys,
        sorter,
        setSorter,
        setSelectedKeys,
        onDelete,
        onChangeAll,
        onSearch,
      }}
    >
      {children}
    </AttchmentContext.Provider>
  );
};
