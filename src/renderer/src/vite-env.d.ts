/// <reference types="vite/client" />

export type CommandData = { type: string; [key: string]: any };

export interface IElectronAPI {
  send: (type: 'fromRenderer', data: CommandData) => void;
  invoke: <T>(type: 'fromRenderer', data: CommandData) => Promise<T>;
  receive: (type: 'fromMain', callbak: (data: CommandData) => void) => void;
}

declare global {
  interface Window {
    api: IElectronAPI;
  }
}
