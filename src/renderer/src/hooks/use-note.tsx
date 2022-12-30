import React, { useCallback, useContext, useState } from 'react';

import { FolderItemData } from '@/interface';

export interface NoteState {
  data?: FolderItemData;
  folderId: string;
  setFolderId: (id: string) => void;
  setData: (data: FolderItemData) => void;
}

export const NoteContext = React.createContext<NoteState>({} as NoteState);

export const NoteProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<FolderItemData>();
  const [folderId, setFolderId] = useState<string>('');

  return (
    <NoteContext.Provider value={{ data, folderId, setFolderId, setData }}>
      {children}
    </NoteContext.Provider>
  );
};

export interface NoteItemProps {
  id: string;
  active: boolean;
  onClick: () => void;
}

export const useNote = () => {
  const { data, setData, ...rest } = useContext(NoteContext);

  const renderItem = useCallback(
    (
      options: Record<FolderItemData['type'], (props: NoteItemProps) => React.ReactNode>,
      empty: React.ReactNode = null,
    ) => {
      return function render(item = data) {
        if (!item || !options[item.type]) return empty;

        return options[item.type]({
          id: item.id,
          active: data?.id === item.id,
          onClick: () => setData(item),
        });
      };
    },
    [data, setData],
  );

  return { ...rest, renderItem, data, setData };
};
