import React from 'react';
import { RiUnderline } from 'react-icons/ri';

import { useMarkdownContext } from '../context';
import CommandButton from './command-button';

const ToggleUnderlineButton: React.FC = () => {
  const { editor } = useMarkdownContext();

  return (
    <CommandButton
      onClick={() => editor.chain().focus().toggleUnderline().run()}
      enabled={editor.can().chain().focus().toggleUnderline().run()}
      active={editor.isActive('underline')}
      icon={<RiUnderline />}
    />
  );
};

export default ToggleUnderlineButton;
