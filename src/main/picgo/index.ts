import { dialog, Notification, shell } from 'electron';
import { PicGo } from 'picgo';

import { sendMessageToRenderer } from '../ipc/utils';
import { getConfigPath } from './getConfigPath';

const CONFIG_PATH = getConfigPath();

const picgo = new PicGo(CONFIG_PATH);

picgo.saveConfig({
  debug: true,
  PICGO_ENV: 'GUI',
});

const handleConfigWithFunction = (config: any[]) => {
  for (const i in config) {
    if (typeof config[i].default === 'function') {
      config[i].default = config[i].default();
    }
    if (typeof config[i].choices === 'function') {
      config[i].choices = config[i].choices();
    }
  }
  return config;
};

export const getPicBeds = () => {
  const picBedTypes = picgo.helper.uploader.getIdList();
  const picBedFromDB = picgo.getConfig<PICGO.IPicBedType[]>('picBed.list') || [];
  const picBeds = picBedTypes
    .map((item: string) => {
      const visible = picBedFromDB.find((i: PICGO.IPicBedType) => i.type === item); // object or undefined
      return {
        type: item,
        name: picgo.helper.uploader.get(item)!.name || item,
        visible: visible ? visible.visible : true,
      };
    })
    .sort((a) => {
      if (a.type === 'tcyun') {
        return -1;
      }
      return 0;
    }) as PICGO.IPicBedType[];

  return picBeds;
};

export const getPicBedConfig = (type: string) => {
  if (picgo.helper.uploader.get(type)?.config) {
    const _config = picgo.helper.uploader.get(type)!.config!(picgo);
    return handleConfigWithFunction(_config);
  } else {
    return [];
  }
};

export const handleNPMError = () => {
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

picgo.on('uploadProgress', (progress: any) => {
  sendMessageToRenderer('pic-uploadProgress', { progress });
});

picgo.on(
  'notification',
  (message: Electron.NotificationConstructorOptions | undefined) => {
    const notification = new Notification(message);
    notification.show();
  },
);

export default picgo;
