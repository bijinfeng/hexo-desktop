import { Popover, Tooltip } from '@arco-design/web-react';
import React, { ReactNode } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import IconButton from '@/components/icon-button';

export interface CommandButtonProps {
  enabled?: boolean;
  active?: boolean;
  label?: NonNullable<ReactNode>;
  icon?: React.ReactNode;
  onClick?: () => void;
  children?: ReactNode;
  popover?: ReactNode;
}

const CommandButton: React.FC<CommandButtonProps> = (props) => {
  const { active = false, enabled, icon, label, children, popover, onClick } = props;

  const renderButton = () => {
    return (
      <Tooltip content={label}>
        <IconButton
          className="group"
          disabled={!enabled}
          active={active}
          onClick={onClick}
        >
          {icon || children}
          {popover && (
            <RiArrowDownSLine
              className="transition-transform	group-hover:rotate-180"
              fontSize={18}
            />
          )}
        </IconButton>
      </Tooltip>
    );
  };

  if (!popover) return renderButton();

  return (
    <Popover position="bottom" triggerProps={{ showArrow: false }} content={popover}>
      {renderButton()}
    </Popover>
  );
};

export default CommandButton;
