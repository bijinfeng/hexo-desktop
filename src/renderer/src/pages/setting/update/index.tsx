import { Button, Card, Checkbox, Space, Typography } from '@arco-design/web-react';
import React from 'react';

import { useUpdater } from '@/hooks';

import ChangeLog from './change-log';

const Update: React.FC = () => {
  const { version } = useUpdater();

  return (
    <Card title="软件更新" bordered={false}>
      <Space direction="vertical" size="large">
        <Space>
          <Typography.Text bold>当前版本：{version}</Typography.Text>
          <Button size="mini" type="primary">
            检查更新
          </Button>
        </Space>
        <Checkbox>自动安装更新</Checkbox>
        {version && <ChangeLog tag={version} />}
      </Space>
    </Card>
  );
};

export default Update;
