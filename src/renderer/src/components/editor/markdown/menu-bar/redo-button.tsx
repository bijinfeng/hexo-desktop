import React from 'react';
import { RiArrowGoForwardFill } from 'react-icons/ri';

import { useMarkdownContext } from '../context';
import CommandButton from './command-button';

const RedoButton: React.FC = () => {
  const { editor } = useMarkdownContext();

  return (
    <CommandButton
      onClick={() => editor.chain().focus().redo().run()}
      enabled={editor.can().chain().focus().redo().run()}
      icon={<RiArrowGoForwardFill />}
    />
  );
};

export default RedoButton;
