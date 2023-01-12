import { dialog, shell } from 'electron';

import picgo from '../../picgo';
import { showNotification } from '../../utils/notification';

const handleNPMError = () => {
  const handler = (msg: string) => {
    if (msg === 'NPM is not installed') {
      dialog
        .showMessageBox({
          title: '发生错误',
          message: '请安装Node.js并重启PicGo再继续操作',
          buttons: ['Yes'],
        })
        .then((res) => {
          if (res.response === 0) {
            shell.openExternal('https://nodejs.org/');
          }
        });
    }
  };
  picgo.once('failed', handler);
  return () => picgo.off('failed', handler);
};

export interface InstallPicArgs {
  payload: { name: string };
}

const picInstallPic = async ({ payload }: InstallPicArgs) => {
  const fullName = payload.name;
  const dispose = handleNPMError();
  const res = await picgo.pluginHandler.install([fullName]);

  if (res.success) {
    console.log(res);
    // shortKeyHandler.registerPluginShortKey(res.body[0]);
  } else {
    showNotification({
      title: '插件安装失败',
      body: res.body as string,
    });
  }

  dispose();

  return {
    success: res.success,
    body: fullName,
    errMsg: res.success ? '' : res.body,
  };
};

export const picPlugin = { picInstallPic };
