import { Layout, Menu, Typography } from '@arco-design/web-react';
import React from 'react';
import { Outlet } from 'react-router-dom';

import IconConfig from '@/assets/icons/config.svg';

import styles from './style.module.less';

const MenuItem = Menu.Item;
const Sider = Layout.Sider;
const Content = Layout.Content;

const settingMenu = [
  {
    key: 'basic',
    label: '基本设置',
    icon: <IconConfig />,
  },
];

const Setting: React.FC = () => {
  return (
    <Layout>
      <Sider>
        <Menu>
          {settingMenu.map((it) => (
            <MenuItem key={it.key}>
              {React.cloneElement(it.icon, { className: 'arco-icon' })}
              {it.label}
            </MenuItem>
          ))}
        </Menu>
      </Sider>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default Setting;
