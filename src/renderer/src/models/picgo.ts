import { Message } from '@arco-design/web-react';
import dayjs from 'dayjs';
import {
  forEach,
  get as lodashGet,
  isBoolean,
  isError,
  orderBy,
  set as lodashSet,
} from 'lodash-es';
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
  pluginList: PICGO.IPicGoPlugin[];
  getPicConfig: () => Promise<IConfig>;
  savePicConfig: (data: Record<string, any>) => Promise<void>;
  getPicBedConfig: (type: string) => Promise<BedConfig>;
  savePicBedConfig: (type: string, data: PICGO.IStringKeyMap) => Promise<void>;
  setDefaultPicBed: (type: string) => Promise<void>;
  upload: Upload;
  addAttachment: (list: PICGO.IPicAttachment[]) => void;
  deleteAttachment: (ids: Array<string | number>) => void;
  searchAttachment: (search: SearchState, sort?: SorterResult) => PICGO.IPicAttachment[];
  getPluginList: () => Promise<PICGO.IPicGoPlugin[]>;
  importLocalPlugin: () => void;
  installPlugin: (name: string) => Promise<boolean>;
  enablePlugin: (plugin: PICGO.IPicGoPlugin) => void;
  disablePlugin: (plugin: PICGO.IPicGoPlugin) => void;
  uninstallPlugin: (plugin: PICGO.IPicGoPlugin) => Promise<boolean>;
  updatePlugin: (plugin: PICGO.IPicGoPlugin) => Promise<boolean>;
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

  const getPicBeds = () => {
    invokeCommand<PICGO.IPicBedType[]>('getPicBeds').then((_pligins) => {
      set({ picBeds: _pligins });
    });
  };

  getPicConfig().then((config) => {
    const defaultPicBed = config?.picBed?.uploader || config?.picBed?.current || 'smms';
    set({ defaultPicBed });
  });

  const getPluginList = () => {
    return invokeCommand<PICGO.IPicGoPlugin[]>('getPicPluginList').then((list) => {
      set({ pluginList: list });
      return list;
    });
  };

  const refresh = () => {
    getPicBeds();
    getPluginList();
  };

  refresh();

  return {
    attachments: [],
    defaultPicBed: 'smms',
    picBeds: [],
    picBedConfigs: {},
    picBedConfigDatas: {},
    pluginList: [],
    getPicConfig,
    savePicConfig,
    // 获取已安装插件列表
    getPluginList,
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
    // 安装插件
    installPlugin: async (name) => {
      const res = await invokeCommand<PICGO.IPluginHandlerResult<boolean>>(
        'installPicPlugin',
        name,
      );
      refresh();
      res.success && Message.success('安装成功');
      return res.success;
    },
    // 导入本地插件
    importLocalPlugin: async () => {
      const res = await invokeCommand<PICGO.IPluginHandlerResult<boolean> | undefined>(
        'importLocalPicPlugin',
      );

      if (isBoolean(res?.success)) {
        if (res?.success) {
          refresh();
          Message.success('插件导入成功');
        } else {
          Message.error('插件导入失败');
        }
      }
    },
    // 启用插件
    enablePlugin: async (plugin) => {
      await savePicConfig({ [`picgoPlugins.${plugin.fullName}`]: true });
      refresh();
    },
    // 禁用插件
    disablePlugin: async (plugin) => {
      await savePicConfig({ [`picgoPlugins.${plugin.fullName}`]: false });
      refresh();
    },
    // 卸载插件
    uninstallPlugin: async (plugin) => {
      const res = await invokeCommand<PICGO.IPluginHandlerResult<boolean>>(
        'uninstallPicPlugin',
        plugin.fullName,
      );
      refresh();
      res.success && Message.success('卸载成功');
      return res.success;
    },
    // 更新插件
    updatePlugin: async (plugin) => {
      const res = await invokeCommand<PICGO.IPluginHandlerResult<boolean>>(
        'updatePicPlugin',
        plugin.fullName,
      );
      refresh();
      res.success && Message.success('更新成功');
      return res.success;
    },
  };
});
