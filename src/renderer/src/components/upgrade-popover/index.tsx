import { Button, Popover, Space } from '@arco-design/web-react';
import cls from 'classnames';
import React from 'react';

import { ReactComponent as IconUpgrade } from '@/assets/icons/slider-upgrade.svg';
import ChangeLog from '@/components/change-log';
import IconButton from '@/components/icon-button';
import { useUpdaterStore } from '@/models/updater';

const UpgradePopover: React.FC = () => {
  const { upgradeInfo, quitAndInstall, downloaded } = useUpdaterStore();

  if (!upgradeInfo || !downloaded) return null;

  return (
    <Popover
      triggerProps={{ popupAlign: { bottom: [-10, 0] } }}
      content={
        <Space direction="vertical" size="medium">
          <ChangeLog html={upgradeInfo.releaseNotes} />
          <div className="flex justify-end">
            <Button size="mini" type="text" onClick={quitAndInstall}>
              重启升级
            </Button>
          </div>
        </Space>
      }
    >
      <IconButton>
        <IconUpgrade className={cls('arco-icon', 'text-[22px]')} />
      </IconButton>
    </Popover>
  );
};

export default UpgradePopover;
