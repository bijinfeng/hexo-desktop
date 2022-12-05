import { Card as ArchCard, CardProps, Grid } from '@arco-design/web-react';
import cls from 'classnames';
import React from 'react';

import styles from './style.module.less';

interface Props extends CardProps {
  span?: number;
}

const Card: React.FC<Props> = ({ className, span, children, ...rest }) => {
  const renderChildren = () => {
    if (span) {
      return (
        <Grid.Row>
          <Grid.Col span={12}>{children}</Grid.Col>
        </Grid.Row>
      );
    }

    return children;
  };

  return (
    <ArchCard {...rest} bordered={false} className={cls(className, styles.card)}>
      {renderChildren()}
    </ArchCard>
  );
};

export default Card;
