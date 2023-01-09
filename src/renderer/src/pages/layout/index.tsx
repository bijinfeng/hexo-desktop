import { Layout } from '@arco-design/web-react';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './header';
import Slider from './slider';

const Content = Layout.Content;

const LayoutContainer: React.FC = () => (
  <Layout className="h-screen">
    <Header />
    <Layout hasSider id="hexo-body" className="relative overflow-hidden">
      <Slider />
      <Content className="relative rounded-tl-md bg-bg-3">
        <Outlet />
      </Content>
    </Layout>
  </Layout>
);

export default LayoutContainer;
