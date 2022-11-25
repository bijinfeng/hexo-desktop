import { Input, Space } from '@arco-design/web-react';
import React from 'react';

import ListOrder from '@/components/list-order';

import styles from './styles.module.less';

const List: React.FC = () => {
  return (
    <div className={styles['list-wrapper']}>
      <Space>
        <Input.Search placeholder="搜索笔记" className={styles.round} />
        <ListOrder />
      </Space>
    </div>
  );
};

export default List;
