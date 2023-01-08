import { useSetState } from 'ahooks';
import type { SetState } from 'ahooks/es/useSetState';
import React from 'react';

import useSearchStorage from '@/hooks/use-search-storage';
import { SearchState as QueyState, usePicgoStore } from '@/models/picgo';

export interface SearchState {
  searchList: PICGO.IPicAttachment[];
  searchState: QueyState;
  searchStorage: ReturnType<typeof useSearchStorage>;
  setSearchState: SetState<QueyState>;
}

export const SearchContext = React.createContext<SearchState>({} as SearchState);

export const SearchProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [searchState, setSearchState] = useSetState<QueyState>({ keyword: '' });
  const searchStorage = useSearchStorage('attachment-search');
  const searchList = usePicgoStore((state) => state.searchAttachment(searchState));

  return (
    <SearchContext.Provider
      value={{ searchList, searchState, searchStorage, setSearchState }}
    >
      {children}
    </SearchContext.Provider>
  );
};
