import { Layout, Menu, ResizeBoxProps } from '@arco-design/web-react';
import {
  IconDelete,
  IconDriveFile,
  IconFolder,
  IconSettings,
  IconStar,
} from '@arco-design/web-react/icon';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ResizeTrigger from '@/components/resize-trigger';

import styles from './style.module.less';

const MenuItem = Menu.Item;

const normalWidth = 200;
const collapsedWidth = 60;

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
    navigate(`/${key}`);
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
        <MenuItem key="notes">
          <IconDriveFile className={styles.icon} />
          笔记
        </MenuItem>
        <MenuItem key="notebooks">
          <IconFolder className={styles.icon} />
          我的文件夹
        </MenuItem>
        <MenuItem key="favorites">
          <IconStar className={styles.icon} />
          我的收藏
        </MenuItem>
        <MenuItem key="trash">
          <IconDelete className={styles.icon} />
          回收站
        </MenuItem>
        <MenuItem key="setting">
          <IconSettings className={styles.icon} />
          设置
        </MenuItem>
      </Menu>
    </Layout.Sider>
  );
};

export default Slider;
