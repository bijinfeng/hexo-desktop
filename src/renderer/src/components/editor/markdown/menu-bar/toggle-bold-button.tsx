import React from 'react';
import { RiBold } from 'react-icons/ri';

import { useMarkdownContext } from '../context';
import CommandButton from './command-button';

const ToggleBoldButton: React.FC = () => {
  const { editor } = useMarkdownContext();

  return (
    <CommandButton
      onClick={() => editor.chain().focus().toggleBold().run()}
      enabled={editor.can().chain().focus().toggleBold().run()}
      active={editor.isActive('bold')}
      icon={<RiBold />}
    />
  );
};

export default ToggleBoldButton;
