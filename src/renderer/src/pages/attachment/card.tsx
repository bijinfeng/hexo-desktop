import { Grid, Typography } from '@arco-design/web-react';
import React, { useContext } from 'react';

import AttachIcon from './attach-icon';
import { AttchmentContext } from './context';

const Card: React.FC = () => {
  const { data, selectedKeys, setSelectedKeys } = useContext(AttchmentContext);

  return (
    <Grid.Row>
      {data.map((item, index) => (
        <Grid.Col
          xs={6}
          xl={4}
          className="!flex items-center justify-center"
          key={item.id || index}
        >
          <div className="px-2 py-3 w-[100px] flex flex-col items-center hover:bg-fill-1 box-content rounded-lg">
            <AttachIcon
              size={70}
              width={100}
              height={90}
              imgUrl={item.imgUrl}
              type={item.extname}
            />
            <Typography.Paragraph
              className="max-w-full !mt-3"
              ellipsis={{ rows: 2, cssEllipsis: true, expandable: false }}
            >
              {item.fileName}
            </Typography.Paragraph>
          </div>
        </Grid.Col>
      ))}
    </Grid.Row>
  );
};

export default Card;
