import { Card, Layout, Menu, Portal } from '@arco-design/web-react';
import { IconClose } from '@arco-design/web-react/icon';
import {
  Link as IconLink,
  Refresh as IconRefresh,
  SettingTwo as IconConfig,
  Wifi as IconWifi,
} from '@icon-park/react';
import { useScroll } from 'ahooks';
import { isNumber } from 'lodash-es';
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
  const [selectedKey, setSelectKey] = useState<string>();
  const sectionRef = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentScroll = useScroll(contentRef);

  const setSectionRef = (ref: HTMLDivElement, index: number) => {
    sectionRef.current[index] = ref;
  };

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

  useEffect(() => {
    const scrollTop = contentScroll?.top;
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (isNumber(scrollTop) && containerRect) {
      const index = [...sectionRef.current].reverse().findIndex((ref) => {
        const sectionRect = ref.getBoundingClientRect();
        // section 到容器顶部的距离
        const releativeTop = scrollTop + sectionRect.top - containerRect.top;
        // section 中心到容器顶部的距离
        const centerPoint = releativeTop + sectionRect.height / 2;
        // 判断 section 中心 是否在容器的可视区域内
        return centerPoint - scrollTop < containerRect.height;
      });
      const activeIndex = sectionRef.current.length - index - 1;
      setSelectKey(menus[activeIndex]?.key);
    }
  }, [contentScroll?.top]);

  const handleClick = (key: string) => {
    const index = menus.findIndex((menu) => menu.key === key) ?? 0;
    sectionRef.current[index]?.scrollIntoView();
  };

  return (
    <Portal visible>
      <Card
        className="!rounded-tl-md flex !absolute top-[40px] left-[60px] w-[calc(100%-60px)] h-[calc(100%-40px)] z-[1001] flex-col !bg-bg-3"
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
              onClickMenuItem={handleClick}
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
            {menus.map((it, idx) => (
              <div key={it.key} ref={(ref) => ref && setSectionRef(ref, idx)}>
                <it.content />
              </div>
            ))}
          </Content>
        </Layout>
      </Card>
    </Portal>
  );
};

export default Setting;
