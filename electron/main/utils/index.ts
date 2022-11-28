import { app } from 'electron';

export function isDevelopment() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (typeof electron === 'string') {
    throw new TypeError('Not running in an Electron environment!');
  }

  return 'ELECTRON_IS_DEV' in process.env
    ? Number.parseInt(process.env.ELECTRON_IS_DEV!, 10) === 1
    : !app.isPackaged;
}
