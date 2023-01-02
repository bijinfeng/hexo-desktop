import { Button, Checkbox, Progress, Space, Typography } from '@arco-design/web-react';
import React from 'react';

import ChangeLog from '@/components/change-log';
import { useConfigStore } from '@/models/config';
import { useUpdaterStore } from '@/models/updater';

import Card from '../card';

const Update: React.FC = () => {
  const { config, update } = useConfigStore();
  const {
    version,
    upgradeInfo,
    checked,
    checking,
    downloaded,
    downloadProgress,
    quitAndInstall,
    checkForUpdate,
  } = useUpdaterStore();

  const handleAutoUpdate = (checked: boolean) => {
    update({ autoUpgrade: checked });
  };

  const renderVersion = () => {
    if (upgradeInfo) {
      return <Typography.Text bold>发现新版本：{upgradeInfo.version}</Typography.Text>;
    }

    return (
      <Typography.Text bold>
        {checked ? '当前已是最新版本' : '当前版本'}：{version}
      </Typography.Text>
    );
  };

  const renderButton = () => {
    if (upgradeInfo) {
      return (
        <Button
          size="mini"
          type="primary"
          disabled={!downloaded}
          onClick={quitAndInstall}
        >
          重启升级
        </Button>
      );
    }

    return (
      <Button size="mini" type="primary" loading={checking} onClick={checkForUpdate}>
        检查更新
      </Button>
    );
  };

  const renderDownloadProgress = () => {
    if (!downloadProgress) return null;
    return (
      <Progress
        steps={5}
        size="small"
        percent={Math.round(downloadProgress.percent)}
        status="success"
      />
    );
  };

  return (
    <Card title="软件更新" divider={false}>
      <Space direction="vertical" size="large">
        <Space>
          {renderVersion()}
          {renderDownloadProgress()}
          {renderButton()}
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
