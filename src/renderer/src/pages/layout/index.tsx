import { Layout } from '@arco-design/web-react';
import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Setting from './setting';
import Slider from './Slider';
import styles from './style.module.less';

const Content = Layout.Content;

const LayoutContainer: React.FC = () => {
  const layoutRef = useRef<HTMLElement>(null);

  return (
    <Layout className={styles.layout}>
      <Header />
      <Layout hasSider id="hexo-body" className={styles.body}>
        <Slider />
        <Content ref={layoutRef} className={styles.content}>
          <Outlet />
          <Setting layoutRef={layoutRef} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutContainer;
