import { Card as ArchCard, CardProps } from '@arco-design/web-react';
import cls from 'classnames';
import React from 'react';

import styles from './style.module.less';

const Card: React.FC<CardProps> = ({ className, ...rest }) => {
  return <ArchCard {...rest} className={cls(className, styles.card)} />;
};

export default Card;
