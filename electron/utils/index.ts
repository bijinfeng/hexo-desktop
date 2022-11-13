import { app } from 'electron';
import { statSync } from 'fs';
import { join } from 'path';

function isDevelopment() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (typeof electron === 'string') {
    throw new TypeError('Not running in an Electron environment!');
  }

  const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
  const getFromEnv = Number.parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
  return isEnvSet ? getFromEnv : !app.isPackaged;
}

function getPath(filePath) {
  try {
    const result = statSync(filePath);

    if (result.isFile()) {
      return filePath;
    }

    if (result.isDirectory()) {
      return getPath(join(filePath, 'index.html'));
    }
  } catch (_) {
    // ignore
  }
}

export { getPath, isDevelopment };
