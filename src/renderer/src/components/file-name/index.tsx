import cls from 'classnames';
import React from 'react';

import { ReactComponent as IconFolder } from '@/assets/icons/file-folder.svg';
import { ReactComponent as IconMd } from '@/assets/icons/file-md.svg';

import styles from './style.module.less';

const fileIcons = {
  folder: <IconFolder />,
  md: <IconMd />,
};

export interface FileNameProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  type?: string;
}

const FileName: React.FC<FileNameProps> = (props) => {
  const { name, type, ...rest } = props;

  return (
    <div
      className={cls(styles.box, rest.className, {
        [styles['box-hover']]: !!rest.onClick,
      })}
      {...rest}
    >
      {type && fileIcons[type] && React.cloneElement(fileIcons[type])}
      <span className={styles.title}>{name}</span>
    </div>
  );
};

export default FileName;
