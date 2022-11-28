import { Layout } from '@arco-design/web-react';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Slider from './Slider';
import styles from './style.module.less';

const Content = Layout.Content;

const LayoutContainer: React.FC = () => {
  return (
    <Layout className={styles.layout}>
      <Layout hasSider>
        <Slider />
        <Content>
          <Outlet />
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default LayoutContainer;
