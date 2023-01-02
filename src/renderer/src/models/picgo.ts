import { forEach, get as lodashGet, set as lodashSet } from 'lodash-es';
import type { IConfig, IImgInfo } from 'picgo';
import create from 'zustand';

import { invokeCommand, sendCommand } from '@/commands';
import { AppEventManager } from '@/event';

export type { IImgInfo } from 'picgo';
export type BedConfig = { config: PICGO.IPicGoPluginConfig[]; data: PICGO.IStringKeyMap };

interface PicgoStore {
  attachments: IImgInfo[];
  picConfig?: IConfig;
  defaultPicBed: string;
  picBeds: PICGO.IPicBedType[];
  picBedConfigs: Record<string, BedConfig>;
  getPicConfig: () => Promise<IConfig>;
  savePicConfig: (data: Record<string, any>) => Promise<void>;
  getPicBedConfig: (type: string) => Promise<BedConfig>;
  savePicBedConfig: (type: string, data: PICGO.IStringKeyMap) => Promise<void>;
  setDefaultPicBed: (type: string) => Promise<void>;
  upload: (
    paths: string[],
    onProgress: (percent: number) => void,
  ) => Promise<IImgInfo[] | Error>;
  addAttachment: (list: IImgInfo[]) => void;
}

export const usePicgoStore = create<PicgoStore>()((set, get) => {
  const getPicConfig = async (): Promise<IConfig> => {
    let _picConfig = get()?.picConfig;

    if (!_picConfig) {
      _picConfig = await invokeCommand<IConfig>('getPicConfig');
      set({ picConfig: _picConfig });
    }

    return _picConfig;
  };

  const savePicConfig = async (data: Record<string, any>) => {
    const _picConfig = await getPicConfig();
    forEach(data, (value, key) => {
      lodashSet(_picConfig, key, value);
    });
    set({ picConfig: _picConfig });
    return invokeCommand<void>('savePicConfig', data);
  };

  const saveAttachments = (list: IImgInfo[]) => {
    const newAttachments = [...get().attachments, ...list];
    set({ attachments: newAttachments });
    sendCommand('updateAttachment', newAttachments);
  };

  invokeCommand<IImgInfo[]>('getAttachment').then((res) => {
    console.log('res: ', res);
    set({ attachments: res ?? [] });
  });

  invokeCommand<PICGO.IPicBedType[]>('getPicBeds').then((_pligins) => {
    set({ picBeds: _pligins });
  });

  getPicConfig().then((config) => {
    const defaultPicBed = config?.picBed?.uploader || config?.picBed?.current || 'smms';
    set({ defaultPicBed });
  });

  return {
    attachments: [],
    defaultPicBed: 'smms',
    picBeds: [],
    picBedConfigs: {},
    picBedConfigDatas: {},
    getPicConfig,
    savePicConfig,
    upload: async (paths, onProgress) => {
      const handle = ({ progress }) => onProgress(progress);
      AppEventManager.addListener('pic-uploadProgress', handle);
      const res = await invokeCommand<IImgInfo[] | Error>('picUpload', paths);
      AppEventManager.removeListener('pic-uploadProgress', handle);
      return res;
    },
    addAttachment(list) {
      saveAttachments(list);
    },
    getPicBedConfig: async (type) => {
      const configs = get().picBedConfigs;
      if (configs[type]) return configs[type];

      const [config, data] = await Promise.all([
        invokeCommand<PICGO.IPicGoPluginConfig[]>('getPicBedConfig', {
          type,
        }),
        getPicConfig().then((config) => lodashGet(config, `picBed.${type}`)),
      ]);

      set({ picBedConfigs: { ...configs, [type]: { config, data } } });
      return { config, data };
    },
    savePicBedConfig: (type, data) => {
      return savePicConfig({ [`picBed.${type}`]: data });
    },
    setDefaultPicBed: (type) => {
      set({ defaultPicBed: type });

      return savePicConfig({
        'picBed.current': type,
        'picBed.uploader': type,
      });
    },
  };
});
