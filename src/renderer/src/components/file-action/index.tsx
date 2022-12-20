import { IconMore } from '@arco-design/web-react/icon';
import React from 'react';

import ActionDropdown, { ActionItem } from '@/components/action-dropdown';

export interface FileActionProps {
  className: string;
  actions: ActionItem[];
  onClickMenuItem?: (key: string) => void;
}

const FileAction: React.FC<FileActionProps> = (props) => {
  const { actions, onClickMenuItem, className } = props;

  return (
    <ActionDropdown
      className={className}
      actions={actions}
      position="rt"
      onClickMenuItem={onClickMenuItem}
    >
      <IconMore className="text-text-1 text-base" />
    </ActionDropdown>
  );
};

export default FileAction;
