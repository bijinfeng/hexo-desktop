/* eslint-disable @typescript-eslint/no-unused-vars */
namespace PICGO {
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
}
