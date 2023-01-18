import { Button } from '@arco-design/web-react';
import { useSetState } from 'ahooks';
import cls from 'classnames';
import React from 'react';
import { RiFontColor } from 'react-icons/ri';

import { useMarkdownContext } from '../context';
import CommandButton from './command-button';

const colors = [
  'rgb(31, 35, 41)',
  'rgb(143, 149, 158)',
  'rgb(216, 57, 49)',
  'rgb(222, 120, 2)',
  'rgb(220, 155, 4)',
  'rgb(46, 161, 33)',
  'rgb(36, 91, 219)',
  'rgb(100, 37, 208)',
];

const backgroundColors = [
  'rgb(255, 255, 255)',
  'rgba(222, 224, 227, 0.8)',
  'rgb(251, 191, 188)',
  'rgba(254, 212, 164, 0.8)',
  'rgba(255, 246, 122, 0.8)',
  'rgba(183, 237, 177, 0.8)',
  'rgba(186, 206, 253, 0.7)',
  'rgba(205, 178, 250, 0.7)',
  'rgb(242, 243, 245)',
  'rgb(187, 191, 196)',
  'rgb(247, 105, 100)',
  'rgb(255, 165, 61)',
  'rgb(255, 233, 40)',
  'rgb(98, 210, 86)',
  'rgba(78, 131, 253, 0.55)',
  'rgba(147, 90, 246, 0.55)',
];

interface ColorButtonProps {
  border?: boolean;
  active?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const ColorButton: React.FC<React.PropsWithChildren<ColorButtonProps>> = ({
  border,
  children,
  style,
  active,
  onClick,
}) => (
  <button
    className={cls('inline-flex items-center justify-center rounded-sm relative', {
      'border border-fill-3': border,
      'border-transparent': border && active,
      "after:content-[''] after:absolute after:w-[22px] after:h-[22px] after:border-2 after:border-primary-6 after:box-content after:rounded":
        active,
    })}
    style={{ width: 22, height: 22, ...style }}
    onClick={onClick}
  >
    {children}
  </button>
);

type ColorPick = { color: string; backgroundColor: string };

const defaultColorPick: ColorPick = {
  color: colors[0],
  backgroundColor: backgroundColors[0],
};

const ToggleColorButton: React.FC = () => {
  const { editor } = useMarkdownContext();
  const [colorPick, setColorPick] = useSetState<ColorPick>(defaultColorPick);

  const unsetColor = () => {
    editor.commands.unsetHighlight();
    setColorPick(defaultColorPick);
  };

  const setColor = (color: string) => {
    setColorPick({ color });
    if (color === defaultColorPick.color) {
      editor.commands.unsetColor();
    } else {
      editor.commands.setColor(color);
    }
  };

  const setBackground = (color: string) => {
    setColorPick({ backgroundColor: color });
    if (color === defaultColorPick.backgroundColor) {
      editor.commands.unsetHighlight();
    } else {
      editor.commands.toggleHighlight({ color });
    }
  };

  const renderPopover = () => {
    return (
      <div>
        <div className="mb-2 text-xs">字体颜色</div>
        <div className="grid grid-cols-8 gap-x-1">
          {colors.map((color) => (
            <ColorButton
              key={color}
              border
              active={colorPick.color === color}
              onClick={() => setColor(color)}
            >
              <RiFontColor size={16} color={color} />
            </ColorButton>
          ))}
        </div>
        <div className="mb-2 mt-3 text-xs">背景颜色</div>
        <div className="grid grid-cols-8 gap-x-1 gap-y-2">
          {backgroundColors.map((color) => (
            <ColorButton
              key={color}
              style={{ backgroundColor: color }}
              active={colorPick.backgroundColor === color}
              onClick={() => setBackground(color)}
            />
          ))}
        </div>
        <Button size="mini" long className="mt-3" onClick={unsetColor}>
          恢复默认
        </Button>
      </div>
    );
  };

  return (
    <CommandButton
      enabled
      active={editor.isActive('highlight') || editor.isActive('textStyle')}
      icon={<RiFontColor />}
      popover={renderPopover()}
    />
  );
};

export default ToggleColorButton;
