import { useActive, useCommands } from '@remirror/react-core';
import { FC, useCallback } from 'react';
import { UnderlineExtension } from 'remirror/extensions';

import CommandButton, { CommandButtonProps } from '../command-button';

export type ToggleUnderlineButtonProps = Omit<
  CommandButtonProps,
  'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'
>;

export const ToggleUnderlineButton: FC<ToggleUnderlineButtonProps> = (props) => {
  const { toggleUnderline } = useCommands<UnderlineExtension>();

  const handleSelect = useCallback(() => {
    if (toggleUnderline.enabled()) {
      toggleUnderline();
    }
  }, [toggleUnderline]);

  const active = useActive<UnderlineExtension>().underline();
  const enabled = toggleUnderline.enabled();

  return (
    <CommandButton
      {...props}
      commandName="toggleUnderline"
      active={active}
      enabled={enabled}
      onSelect={handleSelect}
    />
  );
};
