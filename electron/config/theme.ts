import { nativeTheme } from 'electron';

import { JSONStorage } from '../jsonstorage';

function getTheme() {
  return JSONStorage.get('theme') || 'light';
}

function setTheme(theme) {
  nativeTheme.themeSource = theme;
  // if (global.win) global.win.setBackgroundColor(getBackgroundColor());
  return JSONStorage.set('theme', theme);
}

function getBackgroundColor() {
  return nativeTheme.shouldUseDarkColors ? '#0f0f0f' : '#ffffff';
}

export { getBackgroundColor, getTheme, setTheme };
