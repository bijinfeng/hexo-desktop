import { Tabs, Typography } from '@arco-design/web-react';
import React from 'react';

import { usePicgoStore } from '@/models/picgo';

import ConfigForm from './config-form';

const BedList: React.FC = () => {
  const { picBeds } = usePicgoStore();

  return (
    <>
      <Typography.Title heading={6}>图床</Typography.Title>
      <Tabs size="mini">
        {picBeds.map((bed) => (
          <Tabs.TabPane key={bed.type} title={bed.name}>
            <ConfigForm bed={bed} />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </>
  );
};

export default BedList;
