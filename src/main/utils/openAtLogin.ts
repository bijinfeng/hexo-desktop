import { is, platform } from '@electron-toolkit/utils';
import { app } from 'electron';

import { setConfigStore } from './store';

export const setOpenAtLogin = (openAtLogin: boolean) => {
  setConfigStore({ openAtLogin });

  if (!is.dev) {
    if (platform.isWindows) {
      app.setLoginItemSettings({
        openAtLogin,
        args: ['--openAsHidden'],
      });
    } else if (platform.isMacOS) {
      app.setLoginItemSettings({
        openAtLogin,
        openAsHidden: true,
      });
    }
  }
};

// 获取是否开机启动
export const isOpenAtLogin = () => {
  if (is.dev) return false;

  if (platform.isWindows) {
    const { openAtLogin } = app.getLoginItemSettings({
      args: ['--openAsHidden'],
    });

    return openAtLogin;
  } else if (platform.isMacOS) {
    const { openAtLogin } = app.getLoginItemSettings();
    return openAtLogin;
  }

  return false;
};

export const isOpenAsHidden = () => {
  if (is.dev) return true;

  if (platform.isWindows) {
    return process.argv.includes('--openAsHidden');
  } else if (platform.isMacOS) {
    return app.getLoginItemSettings().wasOpenedAsHidden;
  }

  return false;
};

const defaultOpenAtLogin = isOpenAtLogin();
setConfigStore({ openAtLogin: defaultOpenAtLogin });
