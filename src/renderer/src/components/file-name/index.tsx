import cls from 'classnames';
import React from 'react';

import { ReactComponent as IconFolder } from '@/assets/icons/file-folder.svg';
import { ReactComponent as IconMd } from '@/assets/icons/file-md.svg';

const fileIcons = {
  folder: <IconFolder />,
  md: <IconMd />,
};

export interface FileNameProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  type?: string;
}

const FileName: React.FC<FileNameProps> = (props) => {
  const { name, type, onClick, ...rest } = props;

  return (
    <div
      className={cls('flex-1 inline-flex items-center gap-[8px]', rest.className)}
      {...rest}
    >
      {type && fileIcons[type] && React.cloneElement(fileIcons[type])}
      <span
        aria-hidden="true"
        onClick={onClick}
        className={cls('felx-1 font-medium text-text-2 text-sm leading-5', {
          'hover:underline': !!onClick,
        })}
      >
        {name}
      </span>
    </div>
  );
};

export default FileName;
