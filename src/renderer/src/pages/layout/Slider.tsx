import { Layout, Menu, ResizeBoxProps } from '@arco-design/web-react';
import {
  IconDelete,
  IconDriveFile,
  IconFolder,
  IconSettings,
  IconStar,
} from '@arco-design/web-react/icon';
import { find } from 'lodash-es';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ResizeTrigger from '@/components/resize-trigger';

import styles from './style.module.less';

const MenuItem = Menu.Item;

const normalWidth = 200;
const collapsedWidth = 60;

const sliders = [
  {
    key: 'notes',
    label: '笔记',
    icon: <IconDriveFile />,
    router: '/notes',
  },
  {
    key: 'notebooks',
    label: '我的文件夹',
    icon: <IconFolder />,
    router: '/notes',
  },
  {
    key: 'favorites',
    label: '我的收藏',
    icon: <IconStar />,
    router: '/notes',
  },
  {
    key: 'trash',
    label: '回收站',
    icon: <IconDelete />,
    router: '/notes',
  },
  {
    key: 'setting',
    label: '设置',
    icon: <IconSettings />,
    router: '/setting',
  },
];

const Slider: React.FC = () => {
  const [isMoving, setIsMoving] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [siderWidth, setSiderWidth] = useState(normalWidth);
  const navigate = useNavigate();

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
    setSiderWidth(collapsed ? collapsedWidth : normalWidth);
  };

  const handleMoving: ResizeBoxProps['onMoving'] = (_, { width }) => {
    if (width > collapsedWidth) {
      setSiderWidth(width);
      setCollapsed(!(width > collapsedWidth + 20));
    } else {
      setSiderWidth(collapsedWidth);
      setCollapsed(true);
    }
  };

  const onClickMenuItem = (key: string) => {
    const target = find(sliders, (it) => it.key === key);
    target && navigate(target.router);
  };

  return (
    <Layout.Sider
      className={styles['layout-sider']}
      collapsible
      onCollapse={onCollapse}
      collapsed={collapsed}
      width={siderWidth}
      trigger={null}
      resizeBoxProps={{
        directions: ['right'],
        onMoving: handleMoving,
        onMovingStart: () => setIsMoving(true),
        onMovingEnd: () => setIsMoving(false),
        resizeTriggers: { right: <ResizeTrigger isMoving={isMoving} /> },
      }}
    >
      <Menu onClickMenuItem={onClickMenuItem}>
        {sliders.map((item) => (
          <MenuItem key={item.key}>
            {React.cloneElement(item.icon, { className: styles.icon })}
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Layout.Sider>
  );
};

export default Slider;
