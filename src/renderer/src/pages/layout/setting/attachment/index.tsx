import { Form, Grid, Select } from '@arco-design/web-react';
import React, { useState } from 'react';

import { usePicgoStore } from '@/models/picgo';

import Card from '../card';
import ConfigForm from './config-form';

const Attachment: React.FC = () => {
  const picBeds = usePicgoStore((state) => state.picBeds);
  const [value, setValue] = useState<string>(() => picBeds[0]?.type);

  return (
    <Card title="附件设置">
      <Grid.Row gutter={24}>
        <Grid.Col span={12}>
          <Form.Item label="图床" layout="vertical">
            <Select
              value={value}
              onChange={setValue}
              options={picBeds.map((it) => ({ label: it.name, value: it.type }))}
            />
          </Form.Item>
        </Grid.Col>
      </Grid.Row>
      {value && <ConfigForm type={value} />}
    </Card>
  );
};

export default Attachment;
