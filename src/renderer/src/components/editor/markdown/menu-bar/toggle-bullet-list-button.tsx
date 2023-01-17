import React from 'react';
import { RiListUnordered } from 'react-icons/ri';

import { useMarkdownContext } from '../context';
import CommandButton from './command-button';

const ToggleBulletListButton: React.FC = () => {
  const { editor } = useMarkdownContext();

  return (
    <CommandButton
      onClick={() => editor.chain().focus().toggleBulletList().run()}
      enabled={editor.can().chain().focus().toggleBulletList().run()}
      active={editor.isActive('bulletList')}
      icon={<RiListUnordered />}
    />
  );
};

export default ToggleBulletListButton;
