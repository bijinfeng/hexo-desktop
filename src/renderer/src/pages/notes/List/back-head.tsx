import { Typography } from '@arco-design/web-react';
import { IconLeft } from '@arco-design/web-react/icon';
import React, { useMemo } from 'react';

import IconButton from '@/components/icon-button';
import { useModelStore } from '@/models/post';

import styles from '../styles.module.less';

interface BackHeadProps {
  id: string;
  onBack: (id: string) => void;
}

const BackHead: React.FC<BackHeadProps> = ({ id, onBack }) => {
  const folderList = useModelStore((state) => state.models.Folder);
  const folder = useMemo(() => folderList.find((it) => it.id === id), [id, folderList]);

  return (
    <div className={styles['back-head']}>
      <IconButton className={styles.back} onClick={() => onBack(id)}>
        <IconLeft />
      </IconButton>
      <Typography.Text bold>{folder?.name}</Typography.Text>
    </div>
  );
};

export default BackHead;
