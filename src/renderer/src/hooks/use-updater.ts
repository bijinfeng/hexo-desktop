import { useEffect, useState } from 'react';

import { sendCommand } from '@/commands';
import { AppEventManager } from '@/event';

const useUpdater = () => {
  // 页面上的提示信息
  const [text] = useState('');
  // 当前应用版本信息
  const [version, setVersion] = useState('');
  // 当前下载进度
  const [progress] = useState(0);

  useEffect(() => {
    // 给主进程发通知，让主进程告诉我们当前应用的版本是多少
    sendCommand('checkAppVersion');
    // 接收主进程发来的通知，检测当前应用版本
    AppEventManager.on('version', (params) => {
      setVersion(params.version);
    });

    // 给主进程发通知，检测当前应用是否需要更新
    sendCommand('checkForUpdate');
    // 接收主进程发来的通知，告诉用户当前应用是否需要更新
    AppEventManager.on('updater', (args) => {
      console.log(args);
    });
  }, []);

  return { text, version, progress };
};

export default useUpdater;
