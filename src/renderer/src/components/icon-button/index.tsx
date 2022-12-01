import cls from 'classnames';
import React from 'react';

import styles from './styles.module.less';

export interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  active?: boolean;
}

const IconButton = (props: ButtonProps) => {
  const { children, className, active, ...rest } = props;

  return (
    <div className={cls(styles.button, { [styles.active]: active }, className)} {...rest}>
      {children}
    </div>
  );
};

export default IconButton;
