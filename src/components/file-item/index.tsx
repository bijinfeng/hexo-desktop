import { List, Typography } from '@arco-design/web-react';
import React from 'react';

import FileAction from '@/components/file-action';

import styles from './style.module.less';

export interface ItemData {
  title: string;
  time: string;
  size: string;
}

const FileItem: React.FC<ItemData> = (props) => {
  const { title, time, size } = props;

  return (
    <List.Item className={styles['file-item']}>
      <div className={styles.top}>
        <Typography.Title ellipsis bold heading={6} className={styles.title}>
          {title}
        </Typography.Title>
        <FileAction className={styles.more} />
      </div>
      <div className={styles.bottom}>
        <span>{time}</span>
        <span>{size}</span>
      </div>
    </List.Item>
  );
};

export default FileItem;
