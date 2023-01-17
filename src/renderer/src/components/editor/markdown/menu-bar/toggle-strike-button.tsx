import React from 'react';
import { RiStrikethrough } from 'react-icons/ri';

import { useMarkdownContext } from '../context';
import CommandButton from './command-button';

const ToggleStrikeButton: React.FC = () => {
  const { editor } = useMarkdownContext();

  return (
    <CommandButton
      onClick={() => editor.chain().focus().toggleStrike().run()}
      enabled={editor.can().chain().focus().toggleStrike().run()}
      active={editor.isActive('strike')}
      icon={<RiStrikethrough />}
    />
  );
};

export default ToggleStrikeButton;
