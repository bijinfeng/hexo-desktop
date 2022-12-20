import { Input } from '@arco-design/web-react';
import { useUpdateEffect } from 'ahooks';
import cls from 'classnames';
import React, { useState } from 'react';

import { ReactComponent as IconFolder } from '@/assets/icons/file-folder.svg';
import { ReactComponent as IconMd } from '@/assets/icons/file-md.svg';

const fileIcons = {
  folder: <IconFolder />,
  md: <IconMd />,
};

export interface FileNameProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  type?: string;
  editable?: boolean;
  onNameChange?: (newName: string) => void;
}

const FileName: React.FC<FileNameProps> = (props) => {
  const { name, type, editable, onClick, onNameChange, ...rest } = props;
  const [nameValue, setNameValue] = useState<string>(name);

  const handleBlur = () => {
    onNameChange?.(nameValue);
  };

  useUpdateEffect(() => {
    setNameValue(name);
  }, [name]);

  return (
    <div
      className={cls(
        'flex-1 inline-flex items-center gap-[8px] relative',
        rest.className,
      )}
      {...rest}
    >
      {type && fileIcons[type] && React.cloneElement(fileIcons[type])}
      {editable ? (
        <Input
          className="absolute left-[28px] !w-[calc(100%-28px)] font-medium text-sm"
          autoFocus
          size="mini"
          value={nameValue}
          onChange={setNameValue}
          onBlur={handleBlur}
        />
      ) : (
        <span
          aria-hidden="true"
          onClick={onClick}
          className={cls('felx-1 font-medium text-text-2 text-sm leading-5', {
            'hover:underline': !!onClick,
          })}
        >
          {name}
        </span>
      )}
    </div>
  );
};

export default FileName;
