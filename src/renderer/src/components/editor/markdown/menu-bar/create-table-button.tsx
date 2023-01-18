import cls from 'classnames';
import { get, isEqual, times } from 'lodash-es';
import React, { useCallback, useState } from 'react';
import { RiTable2 } from 'react-icons/ri';

import { useMarkdownContext } from '../context';
import CommandButton from './command-button';

interface BlockProps {
  onClick: (area: [number, number]) => void;
}

const Block: React.FC<BlockProps> = ({ onClick }) => {
  const [area, setArea] = useState<[number, number]>([0, 0]);

  const handleClick = useCallback(() => {
    onClick(area);
  }, [area]);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const sequence: string = get(e.target, ['dataset', 'sequence']);
      if (sequence && !isEqual(area, sequence.split('_'))) {
        setArea(sequence.split('_').map((it) => Number(it)) as [number, number]);
      }
    },
    [area],
  );

  return (
    <div onMouseMove={handleMove} onClick={handleClick}>
      {times(9, String).map((_, row) => (
        <div key={row} className="flex gap-1 mb-1">
          {times(9, String).map((_, col) => (
            <div
              key={`${row}_${col}`}
              data-sequence={`${row + 1}_${col + 1}`}
              className={cls('w-4 h-4 bg-fill-3', {
                'bg-primary-6': row < area[0] && col < area[1],
              })}
            />
          ))}
        </div>
      ))}

      <div className="text-center pt-1">{`${area[0]} x ${area[1]}`}</div>
    </div>
  );
};

const CreateTableButton: React.FC = () => {
  const { editor } = useMarkdownContext();

  const insertTable = useCallback<BlockProps['onClick']>((area) => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: area[0], cols: area[1], withHeaderRow: true })
      .run();
  }, []);

  return (
    <CommandButton
      enabled={editor.can().chain().focus().insertTable().run()}
      active={editor.isActive('table')}
      icon={<RiTable2 />}
      popover={<Block onClick={insertTable} />}
    />
  );
};

export default CreateTableButton;
