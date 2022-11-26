import { IconCaretDown } from '@arco-design/web-react/icon';
import cls from 'classnames';
import React from 'react';

import OrderRules from '@/assets/icons/order-rules.svg';
import ActionDropdown, { DropItem } from '@/components/action-dropdown';

import styles from './styles.module.less';

const dropList: DropItem[] = [
  {
    key: '1',
    title: '列表展示',
    children: [
      { key: '1.1', title: '摘要' },
      { key: '1.2', title: '列表' },
    ],
  },
  {
    key: '2',
    title: '排序方式',
    children: [
      { key: '2.1', title: '创建时间' },
      { key: '2.2', title: '修改时间' },
      { key: '2.3', title: '文件名称' },
      { key: '2.4', title: '文件大小' },
    ],
  },
];

const ListOrder: React.FC = () => {
  return (
    <ActionDropdown drops={dropList}>
      <OrderRules className={cls('arco-icon', styles['sort-icon'])} />
      <IconCaretDown className={styles['caret-down-icon']} />
    </ActionDropdown>
  );
};

export default ListOrder;
