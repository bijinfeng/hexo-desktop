import { useActive, useCommands } from '@remirror/react-core';
import { FC, useCallback } from 'react';
import { BlockquoteExtension } from 'remirror/extensions';

import CommandButton, { CommandButtonProps } from '../command-button';

export type ToggleBlockquoteButtonProps = Omit<
  CommandButtonProps,
  'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'
>;

export const ToggleBlockquoteButton: FC<ToggleBlockquoteButtonProps> = (props) => {
  const { toggleBlockquote } = useCommands<BlockquoteExtension>();

  const handleSelect = useCallback(() => {
    if (toggleBlockquote.enabled()) {
      toggleBlockquote();
    }
  }, [toggleBlockquote]);

  const active = useActive<BlockquoteExtension>().blockquote();
  const enabled = toggleBlockquote.enabled();

  return (
    <CommandButton
      {...props}
      commandName="toggleBlockquote"
      active={active}
      enabled={enabled}
      onSelect={handleSelect}
    />
  );
};
