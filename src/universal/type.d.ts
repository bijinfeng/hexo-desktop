/* eslint-disable @typescript-eslint/no-unused-vars */
namespace PICGO {
  export type IImgInfo = import('picgo').IImgInfo;
  export type IPluginHandlerResult<T> = import('picgo').IPluginHandlerResult<T>;

  export interface IPicAttachment extends IImgInfo {
    id: string;
    date: string;
    fileType: string;
    size: number;
    updated?: string;
  }

  export interface IPicBedType {
    type: string;
    name: string;
    visible: boolean;
  }

  export interface IStringKeyMap {
    [propName: string]: any;
  }

  interface IFileWithPath {
    path: string;
    name?: string;
  }

  export type Choice =
    | {
        name?: string;
        value?: any;
      }
    | string;

  export interface IPicGoPluginConfig {
    name: string;
    type: string;
    required: boolean;
    default?: any;
    alias?: string;
    choices?: Array<Choice>;
    [propName: string]: any;
  }

  export interface INPMSearchResultObject {
    package: {
      name: string;
      scope: string;
      version: string;
      description: string;
      keywords: string[];
      author: {
        name: string;
      };
      links: {
        npm: string;
        homepage: string;
      };
    };
  }

  export interface IPicGoPlugin {
    name: string;
    fullName: string;
    author: string;
    description: string;
    logo: string;
    version: string | number;
    gui: boolean;
    config:
      | {
          plugin: IPluginMenuConfig;
          uploader: IPluginMenuConfig;
          transformer: IPluginMenuConfig;
          [index: string]: IPluginMenuConfig;
        }
      | {
          [propName: string]: any;
        };
    enabled?: boolean;
    homepage: string;
    guiMenu?: any[];
    ing: boolean;
    hasInstall?: boolean;
  }
}

namespace NOTES {
  export interface Config {
    lang: string; //  语言
    openAtLogin: boolean; // 是否开机自动启动
    autoUpgrade: boolean; //  是否自动升级
  }
}
