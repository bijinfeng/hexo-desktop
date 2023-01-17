import React from 'react';
import { RiH1, RiH2, RiH3, RiH4, RiH5, RiH6 } from 'react-icons/ri';

import { useMarkdownContext } from '../context';
import CommandButton from './command-button';

type Level = 1 | 2 | 3 | 4 | 5 | 6;

const LevelIcon: Record<Level, React.ReactNode> = {
  1: <RiH1 />,
  2: <RiH2 />,
  3: <RiH3 />,
  4: <RiH4 />,
  5: <RiH5 />,
  6: <RiH6 />,
};

interface ToggleHeadingButtonProps {
  level: Level;
}

const ToggleHeadingButton: React.FC<ToggleHeadingButtonProps> = ({ level }) => {
  const { editor } = useMarkdownContext();

  return (
    <CommandButton
      onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
      enabled={editor.can().chain().focus().toggleHeading({ level }).run()}
      active={editor.isActive('heading', { level })}
      icon={LevelIcon[level]}
    />
  );
};

export default ToggleHeadingButton;
