import React from 'react';
import { RiItalic } from 'react-icons/ri';

import { useMarkdownContext } from '../context';
import CommandButton from './command-button';

const ToggleItalicButton: React.FC = () => {
  const { editor } = useMarkdownContext();

  return (
    <CommandButton
      onClick={() => editor.chain().focus().toggleItalic().run()}
      enabled={editor.can().chain().focus().toggleItalic().run()}
      active={editor.isActive('italic')}
      icon={<RiItalic />}
    />
  );
};

export default ToggleItalicButton;
