import { ipcMain } from 'electron';
import logger from 'electron-log';

import { getAction } from './actions';

ipcMain.on('fromRenderer', async (_event, args) => {
  logger.info('Action requested by renderer', args);

  const { type } = args;
  const action = getAction(type);
  if (!action) return;
  await action(args);
});

ipcMain.handle('fromRenderer', async (_event, args) => {
  const { type } = args;
  logger.info('Call requested by renderer', type);
  // const call = getCall(type);
  // if (!call) return;

  // return await call(args, global.win);
  console.log(type);
});
