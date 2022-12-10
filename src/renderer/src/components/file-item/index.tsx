import { List } from '@arco-design/web-react';
import dayjs from 'dayjs';
import React from 'react';

import FileAction from '@/components/file-action';
import FileName from '@/components/file-name';

export interface ItemData {
  title: string;
  time: string;
  type: string;
  size?: string;
  onTitleClick?: () => void;
  onClick?: () => void;
}

const FileItem: React.FC<ItemData> = (props) => {
  const { title, time, size, type, onTitleClick, onClick } = props;

  return (
    <List.Item
      className="group !px-2 !py-[15px] cursor-pointer rounded"
      onClick={onClick}
    >
      <div className="flex items-center	gap-[8px]">
        <FileName name={title} type={type} onClick={onTitleClick} />
        <FileAction className="!hidden group-hover:!inline-flex" />
      </div>
      <div className="flex text-text-3 text-xs mt-1 gap-[15px]">
        <span>{dayjs(time).format('YYYY-MM-DD')}</span>
        {size && <span>{size}</span>}
      </div>
    </List.Item>
  );
};

export default FileItem;
