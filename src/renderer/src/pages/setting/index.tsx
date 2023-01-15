import { Card, Layout, Menu, Portal } from '@arco-design/web-react';
import { IconClose } from '@arco-design/web-react/icon';
import {
  Link as IconLink,
  Refresh as IconRefresh,
  SettingTwo as IconConfig,
  Wifi as IconWifi,
} from '@icon-park/react';
import React, { useEffect, useRef, useState } from 'react';

import IconButtom from '@/components/icon-button';
import { AppEventManager, EventType } from '@/event';

import Attachment from './attachment';
import Basic from './basic';
import Proxy from './proxy';
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
    key: 'attachment',
    label: '附件设置',
    icon: <IconLink />,
    content: Attachment,
  },
  {
    key: 'proxy',
    label: '代理设置',
    icon: <IconWifi />,
    content: Proxy,
  },
  {
    key: 'update',
    label: '软件更新',
    icon: <IconRefresh />,
    content: Update,
  },
];

const Setting: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [selectedKey, setSelectKey] = useState<string>('basic');
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const open = (key?: string) => {
      key && setSelectKey(key);
      setVisible(true);
    };
    const close = () => setVisible(false);

    AppEventManager.addListener(EventType.OPEN_SETTING, open);
    AppEventManager.addListener(EventType.CLOSE_SETTING, close);
    return () => {
      AppEventManager.removeListener(EventType.OPEN_SETTING, open);
      AppEventManager.removeListener(EventType.CLOSE_SETTING, close);
    };
  }, []);

  const renderContent = () => {
    const target = menus.find((it) => it.key === selectedKey);
    if (!target) return null;

    return React.createElement(target.content);
  };

  return (
    <Portal visible>
      <Card
        className="setting-modal-wrapper !rounded-tl-md !bg-bg-3"
        title="设置"
        bordered={false}
        bodyStyle={{ padding: 0, flex: 1, overflow: 'hidden' }}
        style={{ display: visible ? 'flex' : 'none' }}
        extra={
          <IconButtom onClick={() => setVisible(false)}>
            <IconClose style={{ fontSize: 20 }} />
          </IconButtom>
        }
      >
        <Layout className="h-full" ref={containerRef}>
          <Sider
            style={{ boxShadow: 'none' }}
            className="!pt-2.5 border-r border-border setting-sider"
          >
            <Menu
              selectedKeys={selectedKey ? [selectedKey] : undefined}
              onClickMenuItem={setSelectKey}
            >
              {menus.map((it) => (
                <MenuItem key={it.key}>
                  {React.cloneElement(it.icon, {
                    className: 'arco-icon',
                    style: { fontSize: 16 },
                  })}
                  {it.label}
                </MenuItem>
              ))}
            </Menu>
          </Sider>
          <Content className="h-full bg-bg-1 overflow-y-scroll" ref={contentRef}>
            {renderContent()}
          </Content>
        </Layout>
      </Card>
    </Portal>
  );
};

export default Setting;
