import { Layout, Menu } from '@arco-design/web-react';
import React from 'react';

import { ReactComponent as IconConfig } from '@/assets/icons/config.svg';
import { ReactComponent as IconUpgrade } from '@/assets/icons/upgrade.svg';

import Basic from './basic';
import styles from './style.module.less';
import Update from './update';

const MenuItem = Menu.Item;
const Sider = Layout.Sider;
const Content = Layout.Content;

const menus = [
  {
    key: 'basic',
    label: '基本设置',
    icon: <IconConfig />,
    content: Basic,
  },
  {
    key: 'update',
    label: '软件更新',
    icon: <IconUpgrade />,
    content: Update,
  },
];

const Setting: React.FC = () => {
  return (
    <Layout className={styles.container}>
      <Sider>
        <Menu>
          {menus.map((it) => (
            <MenuItem key={it.key}>
              {React.cloneElement(it.icon, { className: 'arco-icon' })}
              {it.label}
            </MenuItem>
          ))}
        </Menu>
      </Sider>
      <Content>
        {menus.map((it) => (
          <it.content key={it.key} />
        ))}
      </Content>
    </Layout>
  );
};

export default Setting;
