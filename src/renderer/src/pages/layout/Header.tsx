import { Divider, Layout, Space } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import cls from 'classnames';
import React from 'react';

import { ReactComponent as IconSettings } from '@/assets/icons/slider-settings.svg';
import { invokeCommand } from '@/commands';
import IconButton from '@/components/icon-button';
import UpgradePopover from '@/components/upgrade-popover';
import WindowControl from '@/components/window-control';
import { AppEventManager, EventType } from '@/event';
import type { Platform } from '@/interface';

import styles from './style.module.less';

const Header: React.FC = () => {
  const { data, loading } = useRequest(() => invokeCommand<Platform>('getPlatform'));

  const openSetting = () => {
    AppEventManager.emit(EventType.OPEN_SETTING);
  };

  return (
    <Layout.Header
      className={cls(styles.header, {
        [styles['header-mac']]: data?.isMacOS,
      })}
    >
      {!loading && (
        <>
          <Space size="medium" className={styles.actions}>
            <UpgradePopover />
            <IconButton onClick={openSetting}>
              <IconSettings className={cls('arco-icon', styles.icon)} />
            </IconButton>
          </Space>
          {data?.isWindows && (
            <>
              <Divider type="vertical" />
              <WindowControl />
            </>
          )}
        </>
      )}
    </Layout.Header>
  );
};

export default Header;
