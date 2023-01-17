import { Tooltip } from '@arco-design/web-react';
import React, { ReactNode } from 'react';

import IconButton from '@/components/icon-button';

export interface CommandButtonProps {
  enabled?: boolean;
  active?: boolean;
  label?: NonNullable<ReactNode>;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const CommandButton: React.FC<CommandButtonProps> = (props) => {
  const { active = false, enabled, icon, label, onClick } = props;

  return (
    <Tooltip content={label}>
      <IconButton disabled={!enabled} active={active} onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default CommandButton;
