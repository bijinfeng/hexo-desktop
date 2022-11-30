import type { NativeTheme } from 'electron';
import { nativeTheme } from 'electron';

import { sendMessageToRenderer } from '../ipc/utils';
import { getStore, setStore } from './store';

const getThemeStore = () => getStore<NativeTheme['themeSource']>('theme');
const setThemeStore = (theme: NativeTheme['themeSource']) => setStore('theme', theme);

/**
 * 更新系统主题并保存到 store 中
 * @param theme
 */
export const updateThem = (theme: NativeTheme['themeSource']) => {
  nativeTheme.themeSource = theme;
  setThemeStore(theme);
};

/**
 * 设置默认主题
 */
export const initNativeTheme = () => {
  const theme = getThemeStore();
  nativeTheme.themeSource = theme;
};

/**
 * 获取渲染进项需要的主题配置
 */
export const getThemeConfig = () => {
  const _theme = getStore('theme');
  const system = _theme === 'system';
  let theme = _theme;

  if (system) {
    theme = nativeTheme.shouldUseDarkColors ? 'dark' : 'light';
  }

  return { system, theme };
};

/**
 * 设置默认主题并监听主题的变化
 */
export const listenerThemeChange = () => {
  initNativeTheme();

  nativeTheme.on('updated', () => {
    // 发送主题到渲染进程
    sendMessageToRenderer('themeChanged', getThemeConfig());
  });
};
