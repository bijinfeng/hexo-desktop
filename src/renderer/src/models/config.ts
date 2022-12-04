import create from 'zustand';

import { invokeCommand, sendCommand } from '@/commands';
import type { Config } from '@/interface/config';

interface ConfigStore {
  config: Config;
  update: (config: Partial<Config>) => void;
  setOpenAtLogin: (bol: boolean) => void;
}

export const useConfigStore = create<ConfigStore>()((set, get) => {
  invokeCommand<Config>('getAppConfig').then((config) => {
    const preConfig = get().config;
    set({ config: { ...preConfig, ...config } });
  });

  const updateConfig: ConfigStore['update'] = (newValue) => {
    const config = get().config;
    set({ config: { ...config, ...newValue } });
    sendCommand('updateConfig', newValue);
  };

  return {
    config: {},
    update: updateConfig,
    setOpenAtLogin: (bol) => {
      const obj: Partial<Config> = { openAtLogin: bol };
      updateConfig(obj);
      sendCommand('setOpenAtLogin', obj);
    },
  };
});
