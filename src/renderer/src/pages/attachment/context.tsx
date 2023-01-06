import React, { useCallback, useState } from 'react';

import { usePicgoStore } from '@/models/picgo';

import type { AttachmentListProps } from './interface';

export interface AttachmentState extends AttachmentListProps {
  onDelete: (ids: (string | number)[]) => void;
  onChangeAll: (checked: boolean) => void;
}

export const AttchmentContext = React.createContext<AttachmentState>(
  {} as AttachmentState,
);

export const AttachmentProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { attachments, deleteAttachment } = usePicgoStore();
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

  return (
    <AttchmentContext.Provider
      value={{ data: attachments, selectedKeys, setSelectedKeys, onDelete, onChangeAll }}
    >
      {children}
    </AttchmentContext.Provider>
  );
};
