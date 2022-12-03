import create from 'zustand';

import { invokeCommand, sendCommand } from '@/commands';
import { AppEventManager } from '@/event';

export enum UpdaterMessageEnum {
  error = 'error', // 下载错误
  checking = 'checking', // 检测中
  updateAva = 'updateAva', // 可以更新
  updateNotAva = 'updateNotAva', // 不可以更新
  downloading = 'downloading', // 更新下载中
  downloaded = 'downloaded', // 下载完成
}

export interface UpdaterStore {
  version: string;
  checking: boolean;
  downloading: boolean;
  upgradeInfo?: { version: string; releaseNotes: string };
  downloadProgress?: any;
  checkForUpdate: () => Promise<boolean>;
  quitAndInstall: () => void;
  downloadUpdate: () => void;
}

export const useUpdaterStore = create<UpdaterStore>()((set) => {
  // 接收主进程发来的通知
  Object.keys(UpdaterMessageEnum).forEach((key) => {
    AppEventManager.on(`updater:${key}`, ({ type, info }) => {
      if (type === 'updater:checking') {
        set({ checking: true });
      } else if (type === 'updater:updateAva') {
        set({ upgradeInfo: info, checking: false });
      } else if (type === 'updater:updateNotAva') {
        set({ checking: false });
      } else if (type === 'updater:downloading') {
        console.log(info);
        set({ downloading: true, downloadProgress: info });
      } else if (type === 'updater:downloaded') {
        set({ downloading: false });
      }
    });
  });

  invokeCommand<string>('getAppVersion').then((version) => set({ version }));

  // 给主进程发通知，检测当前应用是否需要更新
  sendCommand('checkForUpdate');

  return {
    version: '',
    checking: false,
    downloading: false,
    downloadUpdate: () => {
      sendCommand('downloadUpdate');
    },
    quitAndInstall: () => {
      sendCommand('quitAndInstall');
    },
    checkForUpdate: () => {
      // 给主进程发通知，检测当前应用是否需要更新
      sendCommand('checkForUpdate');

      return new Promise<boolean>((resolve) => {
        // 有更新
        const handleUpdateAva = () => {
          AppEventManager.removeListener('updater:updateAva', handleUpdateAva);
          resolve(true);
        };
        AppEventManager.on('updater:updateAva', handleUpdateAva);

        // 没有更新
        const handleUpdateNotAva = () => {
          AppEventManager.removeListener('updater:updateNotAva', handleUpdateNotAva);
          resolve(false);
        };
        AppEventManager.on('updater:updateNotAva', handleUpdateNotAva);
      });
    },
  };
});
