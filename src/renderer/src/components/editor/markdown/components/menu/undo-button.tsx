import { useCommands, useHelpers } from '@remirror/react-core';
import { FC, useCallback } from 'react';
import { HistoryExtension } from 'remirror/extensions';

import CommandButton, { CommandButtonProps } from '../command-button';

export type UndoButtonProps = Omit<
  CommandButtonProps,
  'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'
>;

export const UndoButton: FC<UndoButtonProps> = (props) => {
  const { undo } = useCommands<HistoryExtension>();
  const { undoDepth } = useHelpers<HistoryExtension>(true);

  const handleSelect = useCallback(() => {
    if (undo.enabled()) {
      undo();
    }
  }, [undo]);

  const enabled = undoDepth() > 0;

  return (
    <CommandButton
      {...props}
      commandName="undo"
      active={false}
      enabled={enabled}
      onSelect={handleSelect}
    />
  );
};
