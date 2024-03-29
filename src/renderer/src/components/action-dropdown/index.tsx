import { Dropdown, DropdownProps, TriggerProps } from '@arco-design/web-react';
import React from 'react';

import IconButton from '@/components/icon-button';
import { menuHoc } from '@/components/menu';

export interface ActionDropdownProps extends Omit<DropdownProps, 'position'> {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  position?: TriggerProps['position'];
}

const ActionDropdown: React.FC<ActionDropdownProps> = (props) => {
  const { className, children, position = 'br', active, triggerProps, ...rest } = props;

  return (
    <Dropdown
      trigger="click"
      triggerProps={{ autoFixPosition: false, position, ...triggerProps }}
      {...rest}
    >
      <IconButton active={active} className={className}>
        {children}
      </IconButton>
    </Dropdown>
  );
};

export default menuHoc(ActionDropdown);
export type { Action, ActionItem } from '@/components/menu';
