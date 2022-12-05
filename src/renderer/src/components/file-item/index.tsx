import { List } from '@arco-design/web-react';
import dayjs from 'dayjs';
import React from 'react';

import FileAction from '@/components/file-action';
import FileName from '@/components/file-name';

import styles from './style.module.less';

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
    <List.Item className={styles['file-item']} onClick={onClick}>
      <div className={styles.top}>
        <FileName name={title} type={type} onClick={onTitleClick} />
        <FileAction className={styles.more} />
      </div>
      <div className={styles.bottom}>
        <span>{dayjs(time).format('YYYY-MM-DD')}</span>
        {size && <span>{size}</span>}
      </div>
    </List.Item>
  );
};

export default FileItem;
