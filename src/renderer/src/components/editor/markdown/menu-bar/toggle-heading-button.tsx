import type { Level } from '@tiptap/extension-heading';
import React from 'react';
import {
  RiCheckFill,
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiH5,
  RiH6,
  RiParagraph,
} from 'react-icons/ri';

import { Action } from '@/components/menu';

import { useMarkdownContext } from '../context';
import CommandButton from './command-button';

const defaultLevels = [1, 2, 3, 4, 5, 6] as const;

const LevelActions = {
  1: {
    icon: <RiH1 />,
    title: '一级标题',
  },
  2: {
    icon: <RiH2 />,
    title: '二级标题',
  },
  3: {
    icon: <RiH3 />,
    title: '三级标题',
  },
  4: {
    icon: <RiH4 />,
    title: '四级标题',
  },
  5: {
    icon: <RiH5 />,
    title: '五级标题',
  },
  6: {
    icon: <RiH6 />,
    title: '六级标题',
  },
};

const ToggleHeadingButton: React.FC = () => {
  const { editor } = useMarkdownContext();

  const currentHeadingLevel = defaultLevels.find((level) =>
    editor.isActive('heading', { level }),
  );

  const actions: Action[] = [
    {
      key: 'paragraph',
      title: '正文',
      icon: <RiParagraph />,
      onClick: () => editor.chain().focus().setParagraph().run(),
      isChecked: !currentHeadingLevel,
    },
    ...Object.keys(LevelActions).map((level) => ({
      key: `level_${level}`,
      onClick: () =>
        editor
          .chain()
          .focus()
          .updateAttributes('textStyle', { fontSize: null, fontStyle: null })
          .setHeading({ level: Number(level) as Level })
          .run(),
      isChecked: Number(level) === currentHeadingLevel,
      ...LevelActions[level],
    })),
  ];

  const renderMenu = () => {
    return (
      <div>
        {actions.map((action) => (
          <div
            key={action.key}
            className="flex items-center justify-between leading-9 px-3 cursor-pointer hover:bg-fill-2 min-w-[130px]"
            onClick={action.onClick}
          >
            <div className="flex items-center gap-2">
              {action.icon}
              {action.title}
            </div>
            {action.isChecked && <RiCheckFill />}
          </div>
        ))}
      </div>
    );
  };

  return (
    <CommandButton
      enabled
      popover={renderMenu()}
      popoverProps={{
        triggerProps: {
          showArrow: false,
          popupStyle: { padding: 0, paddingTop: 4, paddingBottom: 4 },
        },
      }}
    >
      {currentHeadingLevel ? (
        LevelActions[currentHeadingLevel].icon
      ) : (
        <span className="text-sm">正文</span>
      )}
    </CommandButton>
  );
};

export default ToggleHeadingButton;
