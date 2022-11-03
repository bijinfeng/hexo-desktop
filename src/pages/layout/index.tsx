import React, { useState } from 'react';
import cls from 'classnames';
import { Menu, Layout, ResizeBoxProps } from '@arco-design/web-react';
import {
  IconDriveFile,
  IconFolder,
  IconStar,
  IconDelete,
  IconSettings,
} from '@arco-design/web-react/icon';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './style.module.less';

const MenuItem = Menu.Item;
const Sider = Layout.Sider;
const Content = Layout.Content;

const normalWidth = 200;
const collapsedWidth = 60;

const LayoutContainer: React.FC = () => {
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

  const TriggerContent = () => (
    <div className={styles['resizebox-custom-trigger']}>
      <div
        className={cls(styles['resizebox-custom-trigger-line'], {
          [styles['resizebox-custom-trigger-line-active']]: isMoving,
        })}
      />
    </div>
  );

  return (
    <Layout className={styles.layout}>
      <Sider
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
          resizeTriggers: { right: <TriggerContent /> },
        }}
      >
        <Menu onClickMenuItem={onClickMenuItem}>
          <MenuItem key="notes">
            <IconDriveFile />
            笔记
          </MenuItem>
          <MenuItem key="notebooks">
            <IconFolder />
            我的文件夹
          </MenuItem>
          <MenuItem key="favorites">
            <IconStar />
            我的收藏
          </MenuItem>
          <MenuItem key="trash">
            <IconDelete />
            回收站
          </MenuItem>
          <MenuItem key="setting">
            <IconSettings />
            设置
          </MenuItem>
        </Menu>
      </Sider>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default LayoutContainer;
