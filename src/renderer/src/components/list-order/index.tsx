import { IconCaretDown } from '@arco-design/web-react/icon';
import React from 'react';

import { ReactComponent as OrderRules } from '@/assets/icons/order-rules.svg';
import ActionDropdown, { ActionItem } from '@/components/action-dropdown';

const dropList: ActionItem[] = [
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
    <ActionDropdown actions={dropList} selectedKeys={['1.1', '2.1']} openKeys={['2.1']}>
      <OrderRules className="arco-icon text-[20px] !text-text-2 !stroke-none" />
      <IconCaretDown fontSize={11} className="!text-text-2" />
    </ActionDropdown>
  );
};

export default ListOrder;
