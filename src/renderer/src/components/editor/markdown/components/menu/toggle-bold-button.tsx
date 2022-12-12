import { useActive, useCommands } from '@remirror/react-core';
import { FC, useCallback } from 'react';
import { BoldExtension } from 'remirror/extensions';

import CommandButton, { CommandButtonProps } from '../command-button';

export type ToggleBoldButtonProps = Omit<
  CommandButtonProps,
  'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'
>;

export const ToggleBoldButton: FC<ToggleBoldButtonProps> = (props) => {
  const { toggleBold } = useCommands<BoldExtension>();

  const handleSelect = useCallback(() => {
    if (toggleBold.enabled()) {
      toggleBold();
    }
  }, [toggleBold]);

  const active = useActive<BoldExtension>().bold();
  const enabled = toggleBold.enabled();

  return (
    <CommandButton
      {...props}
      commandName="toggleBold"
      active={active}
      enabled={enabled}
      onSelect={handleSelect}
    />
  );
};
