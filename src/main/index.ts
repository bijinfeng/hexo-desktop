import './utils/sentry';
import './utils/i18n';
import './ipc/index';
import './utils/openAtLogin';

import { electronApp, is, optimizer, platform } from '@electron-toolkit/utils';
import { app, BrowserWindow, shell } from 'electron';
import { join } from 'path';

import { isOpenAsHidden } from './utils/openAtLogin';
import { listenerThemeChange } from './utils/theme';
import { configureAutoUpdater } from './utils/updater';

async function createWindow() {
  const mainWindow = new BrowserWindow({
    title: 'Main window',
    frame: false,
    titleBarStyle: platform.isWindows ? 'default' : 'hidden',
    titleBarOverlay: {
      height: 40,
    },
    width: 1200,
    height: 800,
    icon: join(__dirname, '../../public/favicon.svg'),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.win = mainWindow;

  mainWindow.on('ready-to-show', () => {
    if (!isOpenAsHidden()) {
      mainWindow.show();
    }
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  if (is.dev) {
    mainWindow.webContents.openDevTools();
  }

  listenerThemeChange();
}

// 当应用已经加载完成后，创建主窗口
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  await createWindow();

  configureAutoUpdater();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 当所有窗口关闭后，应用退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
