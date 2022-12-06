import { Dropdown, DropdownProps } from '@arco-design/web-react';
import React from 'react';

import menuHoc from '@/utils/menu-hoc';

const ContextMenu: React.FC<DropdownProps> = (props) => {
  const { children, droplist, ...rest } = props;

  return (
    <Dropdown trigger="contextMenu" droplist={droplist} {...rest}>
      {children}
    </Dropdown>
  );
};

export default menuHoc(ContextMenu);
export type { ActionItem } from '@/utils/menu-hoc';
