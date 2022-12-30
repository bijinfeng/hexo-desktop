import { IconMore } from '@arco-design/web-react/icon';
import React, { useMemo } from 'react';

import ActionDropdown, { ActionItem } from '@/components/action-dropdown';
import Editors from '@/components/editor';
import Illus from '@/components/illus';
import { useModelStore } from '@/models/post';

interface FolderProps {
  folderId: string;
}

const Folder: React.FC<FolderProps> = ({ folderId }) => {
  const { updateFolderName } = useModelStore();
  const folder = useModelStore((state) =>
    folderId ? state.findFolder(folderId) : undefined,
  );

  if (!folder) return <Illus.Empty />;

  const actions = useMemo<ActionItem[]>(
    () => [
      { key: 'move', title: '移动到' },
      { type: 'divider' },
      { key: 'delete', title: '删除' },
    ],
    [],
  );

  return (
    <Editors
      key={folder.id}
      title={folder.name}
      titleSuffix={
        <ActionDropdown actions={actions}>
          <IconMore fontSize={22} />
        </ActionDropdown>
      }
      onTitleChange={(name) => updateFolderName(folder.id, name)}
    >
      <Editors.Folder />
    </Editors>
  );
};

export default Folder;
