import { ipcMain } from 'electron';
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
