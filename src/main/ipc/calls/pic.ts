import { BrowserWindow, dialog } from 'electron';
import path from 'path';
import { IGuiMenuItem } from 'picgo';
import { handleStreamlinePluginName } from 'universal/utils';

import picgo, { handleNPMError } from '../../picgo';
import { getConfigPath } from '../../picgo/getConfigPath';
import { getConfig, handleConfigWithFunction, IPicGoHelperType } from '../../picgo/utils';
import { showNotification } from '../../utils/notification';

const STORE_PATH = path.dirname(getConfigPath());

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

export const getPicPluginList = (): PICGO.IPicGoPlugin[] => {
  const pluginList = picgo.pluginLoader.getFullList();

  return pluginList.map((packName) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const plugin = picgo.pluginLoader.getPlugin(packName)!;
    const pluginPath = path.join(STORE_PATH, `/node_modules/${packName}`);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pluginPKG = require(path.join(pluginPath, 'package.json'));
    const uploaderName = plugin.uploader || '';
    const transformerName = plugin.transformer || '';
    let menu: Omit<IGuiMenuItem, 'handle'>[] = [];
    if (plugin.guiMenu) {
      menu = plugin.guiMenu(picgo).map((item) => ({
        label: item.label,
      }));
    }
    let gui = false;
    if (pluginPKG.keywords && pluginPKG.keywords.length > 0) {
      if (pluginPKG.keywords.includes('picgo-gui-plugin')) {
        gui = true;
      }
    }

    return {
      name: handleStreamlinePluginName(packName),
      fullName: packName,
      author: pluginPKG.author.name || pluginPKG.author,
      description: pluginPKG.description,
      logo: 'file://' + path.join(pluginPath, 'logo.png').split(path.sep).join('/'),
      version: pluginPKG.version,
      gui,
      config: {
        plugin: {
          fullName: packName,
          name: handleStreamlinePluginName(packName),
          config: plugin.config ? handleConfigWithFunction(plugin.config(picgo)) : [],
        },
        uploader: {
          name: uploaderName,
          config: handleConfigWithFunction(
            getConfig(uploaderName, IPicGoHelperType.uploader, picgo),
          ),
        },
        transformer: {
          name: transformerName,
          config: handleConfigWithFunction(
            getConfig(uploaderName, IPicGoHelperType.transformer, picgo),
          ),
        },
      },
      enabled: picgo.getConfig(`picgoPlugins.${packName}`),
      homepage: pluginPKG.homepage ? pluginPKG.homepage : '',
      guiMenu: menu,
      ing: false,
    };
  });
};

// 导入本地插件
export const importLocalPicPlugin = async (_, mainWindow: BrowserWindow) => {
  const res = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
  });
  const filePaths = res.filePaths;

  if (filePaths.length > 0) {
    const res = await picgo.pluginHandler.install(filePaths);
    return res.success;
  }

  return undefined;
};
