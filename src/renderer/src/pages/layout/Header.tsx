import { Layout, Space } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import cls from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as IconSettings } from '@/assets/icons/slider-settings.svg';
import { ReactComponent as IconUpgrade } from '@/assets/icons/slider-upgrade.svg';
import { invokeCommand } from '@/commands';
import IconButton from '@/components/icon-button';
import type { Platform } from '@/interface';

import styles from './style.module.less';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading } = useRequest(() => invokeCommand<Platform>('getPlatform'));

  return (
    <Layout.Header
      className={cls(styles.header, {
        [styles['header-mac']]: data?.isMacOS,
        [styles['header-windows']]: data?.isWindows,
      })}
    >
      {!loading && (
        <Space size="medium" className={styles.actions}>
          <IconButton>
            <IconUpgrade className={cls('arco-icon', styles.icon)} />
          </IconButton>
          <IconButton onClick={() => navigate('/setting')}>
            <IconSettings className={cls('arco-icon', styles.icon)} />
          </IconButton>
        </Space>
      )}
    </Layout.Header>
  );
};

export default Header;
