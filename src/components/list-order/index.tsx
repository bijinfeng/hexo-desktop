import { IconCaretDown } from '@arco-design/web-react/icon';
import cls from 'classnames';
import React from 'react';

import OrderRules from '@/assets/icons/order-rules.svg';
import IconButton from '@/components/icon-button';

import styles from './styles.module.less';

const ListOrder: React.FC = () => {
  return (
    <IconButton>
      <OrderRules className={cls('arco-icon', styles['sort-icon'])} />
      <IconCaretDown className={styles['caret-down-icon']} />
    </IconButton>
  );
};

export default ListOrder;
