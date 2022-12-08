import { Button, Popover, Space } from '@arco-design/web-react';
import cls from 'classnames';
import React from 'react';

import { ReactComponent as IconUpgrade } from '@/assets/icons/slider-upgrade.svg';
import ChangeLog from '@/components/change-log';
import IconButton from '@/components/icon-button';
import { useUpdaterStore } from '@/models/updater';

import styles from './style.module.less';

const UpgradePopover: React.FC = () => {
  const { upgradeInfo, install } = useUpdaterStore();

  if (!upgradeInfo) return null;

  return (
    <Popover
      triggerProps={{ popupAlign: { bottom: [-10, 0] } }}
      content={
        <Space direction="vertical" size="medium">
          <ChangeLog html={upgradeInfo.releaseNotes} />
          <div className={styles['button-group']}>
            <Button size="mini" type="text" onClick={install}>
              重启升级
            </Button>
          </div>
        </Space>
      }
    >
      <IconButton>
        <IconUpgrade className={cls('arco-icon', styles.icon)} />
      </IconButton>
    </Popover>
  );
};

export default UpgradePopover;
