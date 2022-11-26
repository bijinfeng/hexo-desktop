import React from 'react';

import IconMd from '@/assets/icons/file-md.svg';

import styles from './style.module.less';

interface FileNameProps {
  name: string;
}

const FileName: React.FC<FileNameProps> = (props) => {
  const { name } = props;

  return (
    <div className={styles.box}>
      <IconMd />
      <span className={styles.title}>{name}</span>
    </div>
  );
};

export default FileName;
