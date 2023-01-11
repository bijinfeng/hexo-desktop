import { Divider, Typography } from '@arco-design/web-react';
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  width?: number | string;
  divider?: boolean;
}

const Card: React.FC<Props> = (props) => {
  const { divider, width = '70%', children, title, ...rest } = props;

  return (
    <>
      <div {...rest} className="p-4">
        <Typography.Title heading={5} className="!mb-6 !mt-0">
          {title}
        </Typography.Title>
        <div style={{ width }}>{children}</div>
      </div>
      {divider && (
        <div className="mx-4">
          <Divider className="!m-0" />
        </div>
      )}
    </>
  );
};

export default Card;
