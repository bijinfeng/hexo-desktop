import React from 'react';
import { RiArrowGoBackFill } from 'react-icons/ri';

import { useMarkdownContext } from '../context';
import CommandButton from './command-button';

const UndoButton: React.FC = () => {
  const { editor } = useMarkdownContext();

  return (
    <CommandButton
      onClick={() => editor.chain().focus().undo().run()}
      enabled={editor.can().chain().focus().undo().run()}
      icon={<RiArrowGoBackFill />}
    />
  );
};

export default UndoButton;
