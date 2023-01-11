import create from 'zustand';

import { invokeCommand, sendCommand } from '@/commands';
import { initI18n } from '@/i18n';

interface ConfigStore {
  config: Partial<NOTES.Config>;
  update: (config: Partial<NOTES.Config>) => void;
  setOpenAtLogin: (bol: boolean) => void;
}

export const useConfigStore = create<ConfigStore>()((set, get) => {
  invokeCommand<NOTES.Config>('getAppConfig').then(async (config) => {
    const preConfig = get().config;
    await initI18n(config.lang);
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
      const obj: Partial<NOTES.Config> = { openAtLogin: bol };
      updateConfig(obj);
      sendCommand('setOpenAtLogin', obj);
    },
  };
});
