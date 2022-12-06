import { IconMore } from '@arco-design/web-react/icon';
import React from 'react';

import ActionDropdown, { ActionItem } from '@/components/action-dropdown';
import { fileMove } from '@/components/file-move';

import styles from './style.module.less';

export interface FileActionProps {
  className: string;
}

const dropList: ActionItem[] = [
  {
    key: '1',
    title: '新建',
  },
];

const FileAction: React.FC<FileActionProps> = (props) => {
  const { className } = props;

  const handleAction = () => {
    fileMove();
  };

  return (
    <ActionDropdown
      className={className}
      actions={dropList}
      position="rt"
      onClickMenuItem={handleAction}
    >
      <IconMore className={styles.icon} />
    </ActionDropdown>
  );
};

export default FileAction;
