import { Input, List } from '@arco-design/web-react';
import { IconSearch } from '@arco-design/web-react/icon';
import React from 'react';

import FileItem, { ItemData } from '@/components/file-item';
import ListOrder from '@/components/list-order';
import { useModelStore } from '@/models/post';

import styles from './styles.module.less';

const data: ItemData[] = [
  {
    title: '无标题 Markdown',
    time: '2020-10-09',
    size: '0B',
  },
];

const ListSlider: React.FC = () => {
  const posts = useModelStore((state) => state.models.Post);

  console.log(posts);

  const renderItem = (item: ItemData, index: number) => {
    return <FileItem key={index} {...item} />;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Input placeholder="搜索笔记" prefix={<IconSearch />} className={styles.round} />
        <ListOrder />
      </div>
      <List
        className={styles.list}
        hoverable
        bordered={false}
        render={renderItem}
        dataSource={data}
      />
    </div>
  );
};

export default ListSlider;
