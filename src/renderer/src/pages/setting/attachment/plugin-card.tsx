import { Card, Image, Tag } from '@arco-design/web-react';
import { IconLoading } from '@arco-design/web-react/icon';
import { Power as IconPower, SettingTwo as IconConfig } from '@icon-park/react';
import React, { useMemo, useState } from 'react';

import defaultLogo from '@/assets/roundLogo.png';
import ActionDropdown, { ActionItem } from '@/components/action-dropdown';
import { confirm } from '@/components/confirm';
import { usePicgoStore } from '@/models/picgo';
import { openUrl } from '@/utils/open-url';

import { installPlugin } from './utils';

interface PluginCardProps {
  item: PICGO.IPicGoPlugin;
}

const PluginCardInner: React.FC<React.PropsWithChildren<PluginCardProps>> = ({
  item,
  children,
}) => (
  <Card
    size="small"
    bodyStyle={{
      display: 'flex',
      position: 'relative',
      overflow: 'hidden',
      padding: 12,
    }}
  >
    <Image
      width={64}
      height={64}
      src={item.logo}
      error={<img src={defaultLogo} alt="default-logo" />}
    />
    <div className="flex flex-col justify-between flex-1 overflow-hidden ml-2 text-text-1">
      <div
        className="flex items-center hover:text-primary-6 cursor-pointer"
        onClick={() => openUrl(item.homepage)}
        title={item.name}
      >
        <span className="truncate font-medium leading-5">{item.name}</span>
        <small className="ml-2">{item.version}</small>
      </div>
      <div className="text-xs truncate" title={item.description}>
        {item.description}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs">{item.author}</span>
        {children}
      </div>
    </div>

    {!item.gui && (
      <div className="absolute right-0 top-0 bg-primary-6 inline-flex w-[50px] justify-center items-center text-[11px] leading-tight translate-x-3.5 translate-y-1 rotate-45">
        CLI
      </div>
    )}
  </Card>
);

// 待安装插件 card
export const PluginSearchCard: React.FC<PluginCardProps> = ({ item }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const hasInstall = usePicgoStore((state) => {
    return state.pluginList.find((it) => it.fullName === item.fullName);
  });

  const handleInstall = async () => {
    setLoading(true);
    const res = await installPlugin(item.fullName);
    setLoading(false);
    console.log(res);
  };

  const handleInstallPlugin = (item: PluginCardProps['item']) => {
    if (loading && hasInstall) return;

    if (!item.gui) {
      confirm({
        title: '注意',
        content: '该插件未对可视化界面进行优化, 是否继续安装?',
        onOk: handleInstall,
      });
    } else {
      handleInstall();
    }
  };

  return (
    <PluginCardInner item={item}>
      <Tag
        size="small"
        className={hasInstall ? undefined : 'cursor-pointer'}
        onClick={() => handleInstallPlugin(item)}
      >
        <div className="flex items-center gap-1">
          {loading && <IconLoading />}
          {hasInstall ? '已安装' : '安装'}
        </div>
      </Tag>
    </PluginCardInner>
  );
};

// 已安装插件 card
export const PluginInstalledCard: React.FC<PluginCardProps> = ({ item }) => {
  const actions = useMemo<ActionItem[]>(() => {
    console.log(item);
    return [
      item.enabled
        ? {
            key: 'inactive',
            title: '禁用插件',
          }
        : {
            key: 'active',
            title: '启用插件',
          },

      {
        key: 'uninstall',
        title: '卸载插件',
      },
      {
        key: 'update',
        title: '更新插件',
      },
      ...(item.gui
        ? [
            {
              key: 'setting',
              title: '设置插件',
            },
          ]
        : []),
    ];
  }, [item]);

  return (
    <PluginCardInner item={item}>
      <ActionDropdown actions={actions} triggerProps={{ style: { zIndex: 1001 } }}>
        {item.enabled ? <IconConfig /> : <IconPower />}
      </ActionDropdown>
    </PluginCardInner>
  );
};
