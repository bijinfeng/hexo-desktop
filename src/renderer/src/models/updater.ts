import { Message } from '@arco-design/web-react';
import { create } from 'zustand';

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
  checked: boolean;
  downloaded: boolean;
  upgradeInfo?: { version: string; releaseNotes: string };
  downloadProgress?: {
    bytesPerSecond: number;
    delta: number;
    percent: number;
    total: number;
    transferred: number;
  };
  checkForUpdate: () => void;
  quitAndInstall: () => void;
}

export const useUpdaterStore = create<UpdaterStore>()((set, get) => {
  let notAvaMessage: () => void;

  // 接收主进程发来的通知
  Object.keys(UpdaterMessageEnum).forEach((key) => {
    AppEventManager.on(`updater:${key}`, ({ type, info }) => {
      if (type === 'updater:updateAva') {
        set({ upgradeInfo: info, checking: false, checked: true });
      } else if (type === 'updater:updateNotAva') {
        notAvaMessage && notAvaMessage();
        set({ checking: false, checked: true });
      } else if (type === 'updater:downloading') {
        const { downloadProgress, downloaded } = get();
        if (
          !downloaded &&
          (!downloadProgress || info?.percent > downloadProgress?.percent)
        ) {
          set({ downloadProgress: info });
        }
      } else if (type === 'updater:downloaded') {
        set({ downloadProgress: undefined, downloaded: true });
      }
    });
  });

  invokeCommand<string>('getAppVersion').then((version) => set({ version }));

  // 给主进程发通知，检测当前应用是否需要更新
  sendCommand('checkForUpdate');

  return {
    version: '',
    downloaded: false,
    checking: false,
    checked: false,
    quitAndInstall: async () => {
      sendCommand('quitAndInstall');
    },
    checkForUpdate: () => {
      notAvaMessage = () => Message.success('当前已是最新版本');
      set({ checking: true });
      // 给主进程发通知，检测当前应用是否需要更新
      sendCommand('checkForUpdate');
    },
  };
});
