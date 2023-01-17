import React from 'react';
import { RiBracesLine } from 'react-icons/ri';

import { useMarkdownContext } from '../context';
import CommandButton from './command-button';

const ToggleCodeBlockButton: React.FC = () => {
  const { editor } = useMarkdownContext();

  return (
    <CommandButton
      onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      enabled={editor.can().chain().focus().toggleCodeBlock().run()}
      active={editor.isActive('codeBlock')}
      icon={<RiBracesLine />}
    />
  );
};

export default ToggleCodeBlockButton;
