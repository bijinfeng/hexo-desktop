import React from 'react';
import { RiCodeLine } from 'react-icons/ri';

import { useMarkdownContext } from '../context';
import CommandButton from './command-button';

const ToggleCodeButton: React.FC = () => {
  const { editor } = useMarkdownContext();

  return (
    <CommandButton
      onClick={() => editor.chain().focus().toggleCode().run()}
      enabled={editor.can().chain().focus().toggleCode().run()}
      active={editor.isActive('code')}
      icon={<RiCodeLine />}
    />
  );
};

export default ToggleCodeButton;
