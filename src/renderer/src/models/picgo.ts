import dayjs from 'dayjs';
import { forEach, get as lodashGet, isError, orderBy, set as lodashSet } from 'lodash-es';
import type { IConfig } from 'picgo';
import { v1 as uuid } from 'uuid';
import { create } from 'zustand';

import { invokeCommand, sendCommand } from '@/commands';
import { AppEventManager } from '@/event';

export type SearchState = { keyword: string; type?: string };
export type SortDirection = 'ascend' | 'descend';
export type SorterResult = { field: string; direction?: SortDirection };
export type BedConfig = { config: PICGO.IPicGoPluginConfig[]; data: PICGO.IStringKeyMap };
export type Upload = (
  file: File,
  onProgress: (percent: number) => void,
) => Promise<PICGO.IPicAttachment[] | Error>;

interface PicgoStore {
  attachments: PICGO.IPicAttachment[];
  picConfig?: IConfig;
  defaultPicBed: string;
  picBeds: PICGO.IPicBedType[];
  picBedConfigs: Record<string, BedConfig>;
  getPicConfig: () => Promise<IConfig>;
  savePicConfig: (data: Record<string, any>) => Promise<void>;
  getPicBedConfig: (type: string) => Promise<BedConfig>;
  savePicBedConfig: (type: string, data: PICGO.IStringKeyMap) => Promise<void>;
  setDefaultPicBed: (type: string) => Promise<void>;
  upload: Upload;
  addAttachment: (list: PICGO.IPicAttachment[]) => void;
  deleteAttachment: (ids: Array<string | number>) => void;
  searchAttachment: (search: SearchState, sort?: SorterResult) => PICGO.IPicAttachment[];
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

  const saveAttachments = (list: PICGO.IPicAttachment[]) => {
    const newAttachments = [...get().attachments, ...list];

    set({ attachments: newAttachments });
    sendCommand('updateAttachment', newAttachments);
  };

  invokeCommand<PICGO.IPicAttachment[]>('getAttachment').then((res) => {
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
    // 上传附件
    upload: async (file, onProgress) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const paths = [file.path];
      const handle = ({ progress }) => onProgress(progress);
      AppEventManager.addListener('pic-uploadProgress', handle);
      const res = await invokeCommand<PICGO.IImgInfo[] | Error>('picUpload', paths);
      AppEventManager.removeListener('pic-uploadProgress', handle);
      if (isError(res)) return res;
      return (res as PICGO.IImgInfo[]).map((item) => ({
        ...item,
        fileType: file.type,
        size: file.size,
        id: uuid(), // 主键 id
        date: dayjs().format(), // 新建时间
      }));
    },
    // 新增附件
    addAttachment: saveAttachments,
    // 获取图床配置
    getPicBedConfig: async (type) => {
      const configs = get().picBedConfigs;
      if (configs[type]) return configs[type];

      const [config, data] = await Promise.all([
        invokeCommand<PICGO.IPicGoPluginConfig[]>('getPicBedConfig', type),
        getPicConfig().then((config) => lodashGet(config, `picBed.${type}`)),
      ]);

      set({ picBedConfigs: { ...configs, [type]: { config, data } } });
      return { config, data };
    },
    // 修改图床配置
    savePicBedConfig(type, data) {
      return savePicConfig({ [`picBed.${type}`]: data });
    },
    // 设置默认图床
    setDefaultPicBed(type) {
      set({ defaultPicBed: type });

      return savePicConfig({
        'picBed.current': type,
        'picBed.uploader': type,
      });
    },
    // 删除附件
    deleteAttachment(ids) {
      const { attachments } = get();
      set({ attachments: attachments.filter((it) => !ids.includes(it.id)) });
    },
    // 搜索附件
    searchAttachment({ keyword, type }, sort) {
      const { attachments } = get();
      let list = attachments;

      // 搜索
      if (keyword) {
        list = list.filter((item) => {
          // 附件类型匹配
          const isMatchType = !type || item.fileType.startsWith(type);
          return (
            isMatchType &&
            item.fileName &&
            item.fileName?.search(new RegExp(keyword, 'i')) >= 0
          );
        });
      }

      // 排序
      if (sort?.direction) {
        list = orderBy(list, sort.field, sort?.direction === 'ascend' ? 'asc' : 'desc');
      }

      return list;
    },
  };
});
