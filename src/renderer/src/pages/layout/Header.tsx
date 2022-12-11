import { Divider, Layout } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import cls from 'classnames';
import React from 'react';

import { ReactComponent as IconSettings } from '@/assets/icons/slider-settings.svg';
import { invokeCommand } from '@/commands';
import IconButton from '@/components/icon-button';
import UpgradePopover from '@/components/upgrade-popover';
import WindowControl from '@/components/window-control';
import { AppEventManager, EventType } from '@/event';
import type { Platform } from '@/interface';

const Header: React.FC = () => {
  const { data, loading } = useRequest(() => invokeCommand<Platform>('getPlatform'));

  const openSetting = () => {
    AppEventManager.emit(EventType.OPEN_SETTING);
  };

  return (
    <Layout.Header
      className={cls('flex items-center justify-end px-4 app-region-drag h-[40px]', {
        'pl-[70px]': data?.isMacOS,
        'pr-[10px]': data?.isWindows,
      })}
    >
      {!loading && (
        <div className="flex items-center app-region-no-drag h-full">
          <UpgradePopover />
          <IconButton onClick={openSetting} className="ml-4">
            <IconSettings className={cls('arco-icon', 'text-[22px]')} />
          </IconButton>
          {data?.isWindows && (
            <>
              <Divider type="vertical" />
              <WindowControl />
            </>
          )}
        </div>
      )}
    </Layout.Header>
  );
};

export default Header;
