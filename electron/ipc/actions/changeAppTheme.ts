import type { NativeTheme } from 'electron';
import { nativeTheme } from 'electron';
import logger from 'electron-log';

import { EVENTS } from '../../ipc/events';
import { sendMessageToRenderer } from '../../ipc/utils';
import { getTheme, setTheme } from '../../utils/store';

const updateThem = (theme: NativeTheme['themeSource']) => {
  nativeTheme.themeSource = theme;
  setTheme(theme);
};

export default (args) => {
  const { theme } = args;

  updateThem(theme);
};

// 监听 theme 的变化
export const listenerThemeChange = () => {
  const theme = getTheme() as NativeTheme['themeSource'];
  updateThem(theme);

  nativeTheme.on('updated', () => {
    const _theme = getTheme();
    logger.info('theme updated', _theme);

    if (_theme === 'system') {
      sendMessageToRenderer(EVENTS.themeChanged, {
        system: true,
        theme: nativeTheme.shouldUseDarkColors ? 'dark' : 'light',
      });
    } else {
      sendMessageToRenderer(EVENTS.themeChanged, {
        system: false,
        theme: _theme,
      });
    }
  });
};
