import { List } from '@arco-design/web-react';
import { IconStarFill } from '@arco-design/web-react/icon';
import cls from 'classnames';
import dayjs from 'dayjs';
import React from 'react';

import ContextMenu from '@/components/context-menu';
import FileAction from '@/components/file-action';
import FileName from '@/components/file-name';
import { ActionItem } from '@/utils/menu-hoc';

export interface ItemData {
  title: string;
  time: string;
  type: string;
  suffix?: React.ReactNode;
  actions?: ActionItem[];
  rightMenu?: ActionItem[];
  active?: boolean;
  nameEditable?: boolean;
  size?: string;
  collect?: boolean; // 是否收藏
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
    collect,
    type,
    suffix,
    actions,
    nameEditable,
    active,
    rightMenu,
    onTitleClick,
    onClick,
    onClickMenuItem,
    onNameChange,
  } = props;

  const renderContent = () => (
    <div className="px-2 !py-[15px]">
      <div className="flex items-center	gap-[8px]">
        <FileName
          editable={nameEditable}
          name={title}
          type={type}
          onClick={onTitleClick}
          onNameChange={onNameChange}
        />
        {collect && (
          <IconStarFill className="group-hover:hidden" style={{ color: '#ffcd00' }} />
        )}
        <div className="hidden group-hover:flex items-center gap-[8px]">
          {suffix}
          {actions && actions.length > 0 && (
            <FileAction onClickMenuItem={onClickMenuItem} actions={actions} />
          )}
        </div>
      </div>
      <div className="flex text-text-3 text-xs mt-1 gap-[15px]">
        <span>{dayjs(time).format('YYYY-MM-DD')}</span>
        {size && <span>{size}</span>}
      </div>
    </div>
  );

  return (
    <List.Item
      className={cls('group !p-0 cursor-pointer', { 'bg-fill-1': active })}
      onClick={onClick}
    >
      {rightMenu && rightMenu.length > 0 ? (
        <ContextMenu actions={rightMenu}>{renderContent()}</ContextMenu>
      ) : (
        renderContent()
      )}
    </List.Item>
  );
};

export default FileItem;
