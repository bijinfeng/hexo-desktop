import { app } from 'electron';
import logger from 'electron-log';
import { isAbsolute, join } from 'path';

function sendMessageToRenderer(type, payload = {}) {
  const message = { type, ...payload };

  logger.info('Sending message to renderer', message);

  if (global.win) global.win.webContents.send('fromMain', message);
}

function resolvePath(_path) {
  if (isAbsolute(_path)) return _path;

  return join(
    ..._path.split('/').map((segment) => {
      let resolved = segment;
      try {
        resolved = app.getPath(resolved);
      } catch (e) {
        // ignore
      }
      return resolved;
    }),
  );
}

export { resolvePath, sendMessageToRenderer };
