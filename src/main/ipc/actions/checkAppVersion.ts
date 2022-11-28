import { app } from 'electron';

import { sendMessageToRenderer } from '../utils';

// 当前引用的版本告知给渲染层
const checkAppVersion = () => {
  sendMessageToRenderer('version', { version: app.getVersion() });
};

export default checkAppVersion;
