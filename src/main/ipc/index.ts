import { BrowserWindow, ipcMain } from 'electron';
import logger from 'electron-log';

import { getAction } from './actions';
import { getCall } from './calls';

ipcMain.on('fromRenderer', (_event, args) => {
  const { type } = args;
  logger.info('Action requested by renderer', type);

  const action = getAction(type);
  action && action(args);
});

ipcMain.handle('fromRenderer', async (_event, args) => {
  const { type } = args;
  logger.info('Call requested by renderer', type);

  const call = getCall(type);
  if (!call) return;

  return await call(args, global.win);
});

ipcMain.on('windowEvent', (event, eventName: string) => {
  const window = BrowserWindow.fromWebContents(event.sender);

  switch (eventName) {
    case 'minimize':
      window?.minimize();
      break;
    case 'maximize':
      window?.isMaximized() ? window.unmaximize() : window?.maximize();
      break;
    case 'close':
      window?.close();
      break;
    default:
      break;
  }
});

ipcMain.handle('windowEvent', (event, eventName: string) => {
  const window = BrowserWindow.fromWebContents(event.sender);

  if (eventName === 'is-maximized') {
    return window?.isMaximized();
  }

  return;
});
