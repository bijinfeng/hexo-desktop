import { useActive, useCommands } from '@remirror/react-core';
import { FC, useCallback } from 'react';
import { TaskListExtension } from 'remirror/extensions';

import CommandButton, { CommandButtonProps } from '../command-button';

export type ToggleTaskListButtonProps = Omit<
  CommandButtonProps,
  'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'
>;

export const ToggleTaskListButton: FC<ToggleTaskListButtonProps> = (props) => {
  const { toggleTaskList } = useCommands<TaskListExtension>();

  const handleSelect = useCallback(() => {
    if (toggleTaskList.enabled()) {
      toggleTaskList();
    }
  }, [toggleTaskList]);

  const active = useActive<TaskListExtension>().taskList();
  const enabled = toggleTaskList.enabled();

  return (
    <CommandButton
      {...props}
      commandName="toggleTaskList"
      active={active}
      enabled={enabled}
      onSelect={handleSelect}
    />
  );
};
