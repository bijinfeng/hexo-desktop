import cls from 'classnames';
import React from 'react';

import styles from './style.module.less';

export interface ResizeTriggerProps {
  isMoving: boolean;
}

const ResizeTrigger: React.FC<ResizeTriggerProps> = ({ isMoving }) => {
  return (
    <div
      className={cls(styles['resizebox-custom-trigger'], {
        [styles['resizebox-custom-trigger-active']]: isMoving,
      })}
    >
      <div className={styles['resizebox-custom-trigger-line']} />
    </div>
  );
};

export default ResizeTrigger;
