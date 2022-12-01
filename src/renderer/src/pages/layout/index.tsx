import { Layout } from '@arco-design/web-react';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Slider from './Slider';
import styles from './style.module.less';

const Content = Layout.Content;

const LayoutContainer: React.FC = () => {
  return (
    <Layout className={styles.layout}>
      <Header />
      <Layout hasSider className={styles.body}>
        <Slider />
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutContainer;
