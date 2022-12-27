import { Layout } from '@arco-design/web-react';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Setting from './setting';
import Slider from './Slider';

const Content = Layout.Content;

const LayoutContainer: React.FC = () => (
  <Layout className="h-screen">
    <Header />
    <Layout hasSider id="hexo-body" className="relative overflow-hidden">
      <Slider />
      <Content className="relative rounded-tl-md bg-bg-3">
        <Outlet />
        <Setting />
      </Content>
    </Layout>
  </Layout>
);

export default LayoutContainer;
