import { Card, Layout, Menu, Portal } from '@arco-design/web-react';
import { IconClose } from '@arco-design/web-react/icon';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  RiArrowUpCircleLine,
  RiLinksFill,
  RiSendPlaneLine,
  RiSettings4Line,
} from 'react-icons/ri';

import IconButtom from '@/components/icon-button';
import { AppEventManager, EventType } from '@/event';

import Attachment from './attachment';
import Basic from './basic';
import Proxy from './proxy';
import Update from './update';

const MenuItem = Menu.Item;
const Sider = Layout.Sider;
const Content = Layout.Content;

const Setting: React.FC = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [selectedKey, setSelectKey] = useState<string>('basic');
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const menus = useMemo(
    () => [
      {
        key: 'basic',
        label: t('basic-settings'),
        icon: <RiSettings4Line />,
        content: Basic,
      },
      {
        key: 'attachment',
        label: t('attachment-settings'),
        icon: <RiLinksFill />,
        content: Attachment,
      },
      {
        key: 'proxy',
        label: '代理设置',
        icon: <RiSendPlaneLine />,
        content: Proxy,
      },
      {
        key: 'update',
        label: '软件更新',
        icon: <RiArrowUpCircleLine />,
        content: Update,
      },
    ],
    [],
  );

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
        title={t('settings')}
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
