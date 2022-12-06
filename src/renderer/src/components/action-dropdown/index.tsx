import { Dropdown, DropdownProps, TriggerProps } from '@arco-design/web-react';
import React from 'react';

import IconButton from '@/components/icon-button';
import menuHoc from '@/utils/menu-hoc';

export interface ActionDropdownProps extends Omit<DropdownProps, 'position'> {
  children: React.ReactNode;
  className?: string;
  position?: TriggerProps['position'];
}

const ActionDropdown: React.FC<ActionDropdownProps> = (props) => {
  const { className, children, position = 'br', ...rest } = props;

  return (
    <Dropdown
      trigger="click"
      triggerProps={{ autoFixPosition: false, position }}
      {...rest}
    >
      <IconButton className={className}>{children}</IconButton>
    </Dropdown>
  );
};

export default menuHoc(ActionDropdown);
export type { ActionItem } from '@/utils/menu-hoc';
