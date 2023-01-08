import { IconMore } from '@arco-design/web-react/icon';
import React from 'react';

import ActionDropdown, { ActionItem } from '@/components/action-dropdown';

export interface ActionProps {
  className?: string;
  size?: number;
  active?: boolean;
}

const Action: React.FC<ActionProps> = ({ active, className, size }) => {
  const actions: ActionItem[] = [
    {
      key: 'download',
      title: '下载',
    },
    {
      key: 'delete',
      title: '删除',
    },
  ];

  return (
    <ActionDropdown active={active} actions={actions} className={className}>
      <IconMore fontSize={size} />
    </ActionDropdown>
  );
};

export default Action;
