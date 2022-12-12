import { useActive, useCommands } from '@remirror/react-core';
import { FC, useCallback } from 'react';
import { ItalicExtension } from 'remirror/extensions';

import CommandButton, { CommandButtonProps } from '../command-button';

export type ToggleItalicButtonProps = Omit<
  CommandButtonProps,
  'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'
>;

export const ToggleItalicButton: FC<ToggleItalicButtonProps> = (props) => {
  const { toggleItalic } = useCommands<ItalicExtension>();

  const handleSelect = useCallback(() => {
    if (toggleItalic.enabled()) {
      toggleItalic();
    }
  }, [toggleItalic]);

  const active = useActive<ItalicExtension>().italic();
  const enabled = toggleItalic.enabled();

  return (
    <CommandButton
      {...props}
      commandName="toggleItalic"
      active={active}
      enabled={enabled}
      onSelect={handleSelect}
    />
  );
};
