import { CommandsExtension } from '@remirror/core';
import { useCommands, useCurrentSelection } from '@remirror/react-core';
import { FC, useCallback } from 'react';

import CommandButton, { CommandButtonProps } from '../command-button';

export type CopyButtonProps = Omit<
  CommandButtonProps,
  'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'
>;

export const CopyButton: FC<CopyButtonProps> = (props) => {
  const { copy } = useCommands<CommandsExtension>();
  // Force component update on selection change
  useCurrentSelection();

  const handleSelect = useCallback(() => {
    if (copy.enabled()) {
      copy();
    }
  }, [copy]);

  const enabled = copy.enabled();

  return (
    <CommandButton
      {...props}
      commandName="copy"
      active={false}
      enabled={enabled}
      onSelect={handleSelect}
    />
  );
};
