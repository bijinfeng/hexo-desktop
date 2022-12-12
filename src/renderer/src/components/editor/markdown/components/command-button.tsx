import { Tooltip } from '@arco-design/web-react';
import { CoreIcon, isString } from '@remirror/core';
import React, { FC, MouseEvent, MouseEventHandler, ReactNode, useCallback } from 'react';

import IconButton from '@/components/icon-button';

import {
  useCommandOptionValues,
  UseCommandOptionValuesParams,
  UseCommandOptionValuesResult,
} from '../use-command-option-values';
import { Icon } from './icons';

interface ButtonIconProps {
  icon: CoreIcon | JSX.Element | null;
}

const ButtonIcon: FC<ButtonIconProps> = ({ icon }) => {
  if (isString(icon)) {
    return <Icon name={icon} size="1em" />;
  }

  return icon;
};

export interface CommandButtonProps
  extends Omit<UseCommandOptionValuesParams, 'active' | 'attrs'> {
  active?: UseCommandOptionValuesParams['active'];
  'aria-label'?: string;
  label?: NonNullable<ReactNode>;
  commandName: string;
  displayShortcut?: boolean;
  onSelect: () => void;
  icon?: CoreIcon | JSX.Element;
  attrs?: UseCommandOptionValuesParams['attrs'];
}

const CommandButton: React.FC<CommandButtonProps> = ({
  commandName,
  active = false,
  enabled,
  attrs,
  onSelect,
  icon,
  displayShortcut = true,
  'aria-label': ariaLabel,
  label,
  ...rest
}) => {
  const handleChange = useCallback(
    (e: MouseEvent<HTMLElement>, value: any) => {
      onSelect();
      // onChange?.(e, value);
    },
    [onSelect],
  );

  const handleMouseDown: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    e.preventDefault();
  }, []);

  const commandOptions = useCommandOptionValues({ commandName, active, enabled, attrs });

  let fallbackIcon: UseCommandOptionValuesResult['icon'] | null = null;

  if (commandOptions.icon) {
    fallbackIcon = isString(commandOptions.icon)
      ? commandOptions.icon
      : commandOptions.icon.name;
  }

  const labelText = ariaLabel ?? commandOptions.label ?? '';
  const tooltipText = label ?? labelText;
  const shortcutText =
    displayShortcut && commandOptions.shortcut ? ` (${commandOptions.shortcut})` : '';

  return (
    <Tooltip content={`${tooltipText}${shortcutText}`}>
      <IconButton
        aria-label={labelText}
        disabled={!enabled}
        active={active}
        onMouseDown={handleMouseDown}
      >
        <ButtonIcon icon={icon ?? fallbackIcon} />
      </IconButton>
    </Tooltip>
  );
};

export default CommandButton;
