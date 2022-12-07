import { Button, Divider, Layout, Popover, Space } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import cls from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as IconSettings } from '@/assets/icons/slider-settings.svg';
import { ReactComponent as IconUpgrade } from '@/assets/icons/slider-upgrade.svg';
import { invokeCommand } from '@/commands';
import ChangeLog from '@/components/change-log';
import IconButton from '@/components/icon-button';
import WindowControl from '@/components/window-control';
import type { Platform } from '@/interface';
import { useUpdaterStore } from '@/models/updater';

import styles from './style.module.less';

const Header: React.FC = () => {
  const { upgradeInfo } = useUpdaterStore();
  const navigate = useNavigate();
  const { data, loading } = useRequest(() => invokeCommand<Platform>('getPlatform'));

  const renderUpgradeNotice = () => {
    if (!upgradeInfo) return null;

    return (
      <Popover
        title="是否升级"
        content={
          <Space direction="vertical">
            {upgradeInfo.version}
            <ChangeLog html={upgradeInfo.releaseNotes} />
            <Space>
              <Button size="mini">取消</Button>
              <Button size="mini" type="primary">
                确定
              </Button>
            </Space>
          </Space>
        }
      >
        <IconButton>
          <IconUpgrade className={cls('arco-icon', styles.icon)} />
        </IconButton>
      </Popover>
    );
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
            {renderUpgradeNotice()}
            <IconButton onClick={() => navigate('/setting')}>
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
