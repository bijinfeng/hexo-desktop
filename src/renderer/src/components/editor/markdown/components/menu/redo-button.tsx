import { useCommands, useHelpers } from '@remirror/react-core';
import { FC, useCallback } from 'react';
import { HistoryExtension } from 'remirror/extensions';

import CommandButton, { CommandButtonProps } from '../command-button';

export type RedoButtonProps = Omit<
  CommandButtonProps,
  'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'
>;

export const RedoButton: FC<RedoButtonProps> = (props) => {
  const { redo } = useCommands<HistoryExtension>();
  const { redoDepth } = useHelpers<HistoryExtension>(true);

  const handleSelect = useCallback(() => {
    if (redo.enabled()) {
      redo();
    }
  }, [redo]);

  const enabled = redoDepth() > 0;

  return (
    <CommandButton
      {...props}
      commandName="redo"
      active={false}
      enabled={enabled}
      onSelect={handleSelect}
    />
  );
};
