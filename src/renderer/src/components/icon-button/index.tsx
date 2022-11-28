import { Button, ButtonProps } from '@arco-design/web-react';
import cls from 'classnames';

import styles from './styles.module.less';

const IconButton = (props: ButtonProps) => {
  const { children, className, ...rest } = props;

  return (
    <Button
      type="text"
      size="mini"
      className={cls(styles['button'], className)}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default IconButton;
