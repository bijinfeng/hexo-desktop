import { IconDelete, IconReply } from '@arco-design/web-react/icon';
import React from 'react';

import Editors from '@/components/editor';
import IconButton from '@/components/icon-button';
import Illus from '@/components/illus';
import { useModelStore } from '@/models/post';

interface FolderProps {
  folderId: string;
}

const Folder: React.FC<FolderProps> = ({ folderId }) => {
  const { replyFolderFromTrash, delelteFolder } = useModelStore();
  const folder = useModelStore((state) =>
    folderId ? state.findFolder(folderId) : undefined,
  );

  if (!folder) return <Illus.Empty />;

  return (
    <Editors
      key={folder.id}
      editable={false}
      title={folder.name}
      titleSuffix={
        <>
          <IconButton tooltip="恢复" onClick={() => replyFolderFromTrash(folder.id)}>
            <IconReply fontSize={22} />
          </IconButton>
          <IconButton tooltip="永久删除" onClick={() => delelteFolder(folder.id)}>
            <IconDelete fontSize={22} />
          </IconButton>
        </>
      }
    >
      <Editors.Folder />
    </Editors>
  );
};

export default Folder;
