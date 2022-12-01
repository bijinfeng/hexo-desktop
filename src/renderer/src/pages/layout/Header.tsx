import { Layout, Space } from '@arco-design/web-react';
import cls from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as IconSettings } from '@/assets/icons/slider-settings.svg';
import { ReactComponent as IconUpgrade } from '@/assets/icons/slider-upgrade.svg';
import IconButton from '@/components/icon-button';

import styles from './style.module.less';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout.Header className={styles.header}>
      <Space size="medium" className={styles.actions}>
        <IconButton>
          <IconUpgrade className={cls('arco-icon', styles.icon)} />
        </IconButton>
        <IconButton onClick={() => navigate('/setting')}>
          <IconSettings className={cls('arco-icon', styles.icon)} />
        </IconButton>
      </Space>
    </Layout.Header>
  );
};

export default Header;
