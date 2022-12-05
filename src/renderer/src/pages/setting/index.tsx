import { Layout, Menu } from '@arco-design/web-react';
import { useScroll } from 'ahooks';
import cls from 'classnames';
import { isNumber } from 'lodash-es';
import React, { memo, useEffect, useRef, useState } from 'react';

import { ReactComponent as IconConfig } from '@/assets/icons/config.svg';
import { ReactComponent as IconUpgrade } from '@/assets/icons/upgrade.svg';

import Basic from './basic';
import Proxy from './proxy';
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
    key: 'proxy',
    label: '代理设置',
    icon: <IconConfig />,
    content: Proxy,
  },
  {
    key: 'update',
    label: '软件更新',
    icon: <IconUpgrade />,
    content: Update,
  },
];

const Setting: React.FC = () => {
  const [selectedKey, setSelectKey] = useState<string>();
  const sectionRef = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentScroll = useScroll(contentRef);

  const setSectionRef = (ref: HTMLDivElement, index: number) => {
    sectionRef.current[index] = ref;
  };

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
    <Layout className={styles.container} ref={containerRef}>
      <Sider className={styles.sider}>
        <Menu
          selectedKeys={selectedKey ? [selectedKey] : undefined}
          onClickMenuItem={handleClick}
        >
          {menus.map((it) => (
            <MenuItem key={it.key}>
              {React.cloneElement(it.icon, { className: cls('arco-icon', styles.icon) })}
              {it.label}
            </MenuItem>
          ))}
        </Menu>
      </Sider>
      <Content className={styles.content} ref={contentRef}>
        {menus.map((it, idx) => (
          <div key={it.key} ref={(ref) => ref && setSectionRef(ref, idx)}>
            <it.content />
          </div>
        ))}
      </Content>
    </Layout>
  );
};

export default memo(Setting);
