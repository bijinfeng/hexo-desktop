import { useActive, useCommands } from '@remirror/react-core';
import { FC, useCallback } from 'react';
import { StrikeExtension } from 'remirror/extensions';

import CommandButton, { CommandButtonProps } from '../command-button';

export type ToggleStrikeButtonProps = Omit<
  CommandButtonProps,
  'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'
>;

export const ToggleStrikeButton: FC<ToggleStrikeButtonProps> = (props) => {
  const { toggleStrike } = useCommands<StrikeExtension>();

  const handleSelect = useCallback(() => {
    if (toggleStrike.enabled()) {
      toggleStrike();
    }
  }, [toggleStrike]);

  const active = useActive<StrikeExtension>().strike();
  const enabled = toggleStrike.enabled();

  return (
    <CommandButton
      {...props}
      commandName="toggleStrike"
      active={active}
      enabled={enabled}
      onSelect={handleSelect}
    />
  );
};
