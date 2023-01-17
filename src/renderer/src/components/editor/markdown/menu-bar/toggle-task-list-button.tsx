import React from 'react';
import { RiCheckboxMultipleLine } from 'react-icons/ri';

import { useMarkdownContext } from '../context';
import CommandButton from './command-button';

const ToggleTaskListButton: React.FC = () => {
  const { editor } = useMarkdownContext();

  return (
    <CommandButton
      onClick={() => editor.chain().focus().toggleTaskList().run()}
      enabled={editor.can().chain().focus().toggleTaskList().run()}
      active={editor.isActive('taskList')}
      icon={<RiCheckboxMultipleLine />}
    />
  );
};

export default ToggleTaskListButton;
