import {
  Button,
  Card,
  Checkbox,
  Message,
  Progress,
  Space,
  Typography,
} from '@arco-design/web-react';
import React, { useState } from 'react';

import ChangeLog from '@/components/change-log';
import { useUpdaterStore } from '@/models/updater';

const Update: React.FC = () => {
  // const [] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { version, downloading, downloadUpdate, upgradeInfo, checkForUpdate } =
    useUpdaterStore();

  const handleCheck = async () => {
    setLoading(true);
    const bol = await checkForUpdate();
    setLoading(false);
    if (!bol) Message.success('当前已是最新版本');
  };

  const handleInstall = () => {
    downloadUpdate();
  };

  return (
    <Card title="软件更新" bordered={false}>
      <Space direction="vertical" size="large">
        <Space>
          <Typography.Text bold>当前版本：{version}</Typography.Text>
          {downloading && (
            <Progress steps={5} size="small" percent={50} status="success" />
          )}
          {upgradeInfo ? (
            <Button size="mini" type="primary" onClick={handleInstall}>
              安装并更新
            </Button>
          ) : (
            <Button size="mini" type="primary" loading={loading} onClick={handleCheck}>
              检查更新
            </Button>
          )}
        </Space>
        <Checkbox>自动安装更新</Checkbox>
        {upgradeInfo && <ChangeLog html={upgradeInfo.releaseNotes} />}
      </Space>
    </Card>
  );
};

export default Update;
