import {
  Button,
  Checkbox,
  Message,
  Progress,
  Space,
  Typography,
} from '@arco-design/web-react';
import React, { useState } from 'react';

import ChangeLog from '@/components/change-log';
import { useConfigStore } from '@/models/config';
import { useUpdaterStore } from '@/models/updater';

import Card from '../card';

const Update: React.FC = () => {
  const { config, update } = useConfigStore();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { version, upgradeInfo, checkForUpdate, downloaded, downloadProgress, install } =
    useUpdaterStore();

  const handleCheck = async () => {
    setLoading(true);
    const bol = await checkForUpdate();
    setLoading(false);
    setChecked(true);
    if (!bol) Message.success('当前已是最新版本');
  };

  const handleAutoUpdate = (checked: boolean) => {
    update({ autoUpgrade: checked });
  };

  return (
    <Card title="软件更新" bordered={false}>
      <Space direction="vertical" size="large">
        <Space>
          {upgradeInfo ? (
            <Typography.Text bold>最新版本：{upgradeInfo.version}</Typography.Text>
          ) : (
            <Typography.Text bold>
              {checked ? '当前已是最新版本' : '当前版本'}：{version}
            </Typography.Text>
          )}

          {downloadProgress && (
            <Progress
              steps={5}
              size="small"
              percent={Math.round(downloadProgress.percent)}
              status="success"
            />
          )}

          {upgradeInfo ? (
            <Button size="mini" type="primary" disabled={!downloaded} onClick={install}>
              安装并重启
            </Button>
          ) : (
            <Button size="mini" type="primary" loading={loading} onClick={handleCheck}>
              检查更新
            </Button>
          )}
        </Space>
        <Checkbox checked={config.autoUpgrade} onChange={handleAutoUpdate}>
          自动安装更新
        </Checkbox>
        {upgradeInfo && <ChangeLog html={upgradeInfo.releaseNotes} />}
      </Space>
    </Card>
  );
};

export default Update;
