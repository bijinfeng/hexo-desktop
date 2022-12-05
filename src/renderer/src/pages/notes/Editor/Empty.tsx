import React from 'react';

import { ReactComponent as EmptyIllu } from '@/assets/icons/empty-illu.svg';

import styles from './style.module.less';

const Empty: React.FC = () => {
  return (
    <div className={styles.wrap}>
      <EmptyIllu />
    </div>
  );
};

export default Empty;
