import React from 'react';
import { RiDoubleQuotesL } from 'react-icons/ri';

import { useMarkdownContext } from '../context';
import CommandButton from './command-button';

const ToggleBlockquoteButton: React.FC = () => {
  const { editor } = useMarkdownContext();

  return (
    <CommandButton
      onClick={() => editor.chain().focus().toggleBlockquote().run()}
      enabled={editor.can().chain().focus().toggleBlockquote().run()}
      active={editor.isActive('blockquote')}
      icon={<RiDoubleQuotesL />}
    />
  );
};

export default ToggleBlockquoteButton;
