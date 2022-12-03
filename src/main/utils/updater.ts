import { is } from '@electron-toolkit/utils';
import { autoUpdater } from 'electron-updater';
import path from 'path';

import { sendMessageToRenderer } from '../ipc/utils';
import { getConfigStore } from './store';

// 是否自动更新
const autoUpgrade = getConfigStore('autoUpgrade');

enum MessageEnum {
  error = 'error', // 下载错误
  checking = 'checking', // 检测中
  updateAva = 'updateAva', // 可以更新
  updateNotAva = 'updateNotAva', // 不可以更新
  downloading = 'downloading', // 更新下载中
  downloaded = 'downloaded', // 下载完成
}

// 这里是为了在本地做应用升级测试使用
if (is.dev) {
  autoUpdater.forceDevUpdateConfig = true;
  autoUpdater.updateConfigPath = path.join(__dirname, '../../dev-app-update.yml');
}

// 主进程跟渲染进程通信
const sendUpdateMessage = (message: MessageEnum, info = {}) => {
  // 发送消息给渲染进程
  sendMessageToRenderer(`updater:${message}`, { info });
};

// 当我们收到渲染进程传来的消息，主进程就就进行一次更新检查
export const checkForUpdate = () => {
  autoUpdater.checkForUpdates();
};

// 下载更新
export const downloadUpdate = () => {
  autoUpdater.downloadUpdate();
};

// 退出并安装应用
export const quitAndInstall = () => {
  autoUpdater.quitAndInstall();
};

export const configureAutoUpdater = () => {
  // 设置是否自动下载
  autoUpdater.autoDownload = autoUpgrade;

  // 检测下载错误
  autoUpdater.on('error', (...args) => {
    sendUpdateMessage(MessageEnum.error, { ...args });
  });

  // 检测是否需要更新
  autoUpdater.on('checking-for-update', () => {
    sendUpdateMessage(MessageEnum.checking);
  });

  // 检测到可以更新时
  autoUpdater.on('update-available', (info) => {
    sendUpdateMessage(MessageEnum.updateAva, info);

    if (autoUpgrade) downloadUpdate();
  });

  // 检测到不需要更新时
  autoUpdater.on('update-not-available', (info) => {
    // 这里可以做静默处理，不给渲染进程发通知，或者通知渲染进程当前已是最新版本，不需要更新
    sendUpdateMessage(MessageEnum.updateNotAva, info);
  });

  // 更新下载进度
  autoUpdater.on('download-progress', (info) => {
    // 直接把当前的下载进度发送给渲染进程即可，有渲染层自己选择如何做展示
    sendUpdateMessage(MessageEnum.downloading, info);
  });

  // 当需要更新的内容下载完成后
  autoUpdater.on('update-downloaded', () => {
    sendUpdateMessage(MessageEnum.downloaded);
  });
};
