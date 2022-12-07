import { Space } from '@arco-design/web-react';
import React, { memo, useCallback, useEffect, useState } from 'react';

import { ReactComponent as Close } from '@/assets/icons/close.svg';
import { ReactComponent as Maximize } from '@/assets/icons/maximize.svg';
import { ReactComponent as Minimize } from '@/assets/icons/minimize.svg';
import { ReactComponent as Restore } from '@/assets/icons/restore.svg';
import IconButton from '@/components/icon-button';

import styles from './style.module.less';

const WindowControl: React.FC = () => {
  const [isMaximize, setIsMaximize] = useState<boolean>(false);

  useEffect(() => {
    window.windowEvent.get<boolean>('is-maximized').then((bol) => {
      setIsMaximize(bol);
    });
  }, []);

  const handleMinimize = useCallback(() => {
    window.windowEvent.set('minimize');
  }, []);

  const handleMaximize = useCallback(() => {
    window.windowEvent.set('maximize');
    setIsMaximize((pre) => !pre);
  }, []);

  const handleClose = useCallback(() => {
    window.windowEvent.set('close');
  }, []);

  return (
    <Space className={styles.control}>
      <IconButton onClick={handleMinimize}>
        <span className={styles.icon}>
          <Minimize />
        </span>
      </IconButton>
      <IconButton onClick={handleMaximize}>
        <span className={styles.icon}>{isMaximize ? <Restore /> : <Maximize />}</span>
      </IconButton>
      <IconButton onClick={handleClose}>
        <span className={styles.icon}>
          <Close />
        </span>
      </IconButton>
    </Space>
  );
};

export default memo(WindowControl);
