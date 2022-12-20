import { List } from '@arco-design/web-react';
import dayjs from 'dayjs';
import React from 'react';

import FileAction from '@/components/file-action';
import FileName from '@/components/file-name';
import { ActionItem } from '@/utils/menu-hoc';

export interface ItemData {
  title: string;
  time: string;
  type: string;
  actions: ActionItem[];
  nameEditable?: boolean;
  size?: string;
  onTitleClick?: () => void;
  onClick?: () => void;
  onClickMenuItem?: (key: string) => void;
  onNameChange?: (newName: string) => void;
}

const FileItem: React.FC<ItemData> = (props) => {
  const {
    title,
    time,
    size,
    type,
    actions,
    nameEditable,
    onTitleClick,
    onClick,
    onClickMenuItem,
    onNameChange,
  } = props;

  return (
    <List.Item className="group !p-0 cursor-pointer rounded" onClick={onClick}>
      <div className="px-2 !py-[15px]">
        <div className="flex items-center	gap-[8px]">
          <FileName
            editable={nameEditable}
            name={title}
            type={type}
            onClick={onTitleClick}
            onNameChange={onNameChange}
          />
          <FileAction
            onClickMenuItem={onClickMenuItem}
            actions={actions}
            className="invisible group-hover:visible"
          />
        </div>
        <div className="flex text-text-3 text-xs mt-1 gap-[15px]">
          <span>{dayjs(time).format('YYYY-MM-DD')}</span>
          {size && <span>{size}</span>}
        </div>
      </div>
    </List.Item>
  );
};

export default FileItem;
