import logger from 'electron-log';

export function sendMessageToRenderer(type: string, payload = {}) {
  const message = { type, ...payload };

  logger.info('Sending message to renderer', message);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (global.win) global.win.webContents.send('fromMain', message);
}
