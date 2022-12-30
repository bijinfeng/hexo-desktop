import { Typography } from '@arco-design/web-react';
import { IconLeft } from '@arco-design/web-react/icon';
import React from 'react';

import IconButton from '@/components/icon-button';
import { useNote } from '@/hooks/use-note';
import { FolderData } from '@/interface';
import { useModelStore } from '@/models/post';

interface BackHeadProps {
  folder?: FolderData;
}

const BackHead: React.FC<BackHeadProps> = ({ folder }) => {
  const { setFolderId } = useNote();
  const { findParentFolder } = useModelStore();

  if (!folder) return null;

  const handleBack = () => {
    const parentFolder = findParentFolder(folder.id);
    setFolderId(parentFolder);
  };

  return (
    <div className="flex items-center justify-center relative mx-[20px] my-[8px]">
      <IconButton className="left-0 absolute" onClick={handleBack}>
        <IconLeft fontSize={18} />
      </IconButton>
      <Typography.Text bold>{folder.name}</Typography.Text>
    </div>
  );
};

export default BackHead;
