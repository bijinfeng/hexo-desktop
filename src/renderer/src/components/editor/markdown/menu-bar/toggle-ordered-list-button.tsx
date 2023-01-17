import React from 'react';
import { RiListOrdered } from 'react-icons/ri';

import { useMarkdownContext } from '../context';
import CommandButton from './command-button';

const ToggleOrderedListButton: React.FC = () => {
  const { editor } = useMarkdownContext();

  return (
    <CommandButton
      onClick={() => editor.chain().focus().toggleOrderedList().run()}
      enabled={editor.can().chain().focus().toggleOrderedList().run()}
      active={editor.isActive('orderedList')}
      icon={<RiListOrdered />}
    />
  );
};

export default ToggleOrderedListButton;
