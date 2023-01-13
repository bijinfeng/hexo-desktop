import picgo, { handleNPMError } from '../../picgo';
import { showNotification } from '../../utils/notification';

export { getPicBedConfig } from '../../picgo';
export { getPicBeds } from '../../picgo';

export const getPicConfig = ({ path }: { path?: string }) => {
  return picgo.getConfig(path);
};

export const savePicConfig = (data: Record<string, any>) => {
  return picgo.saveConfig(data);
};

export const picUpload = (payload: string[]) => {
  return picgo.upload(payload);
};

export const picInstallPic = async ({ name: fullName }: { name: string }) => {
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
