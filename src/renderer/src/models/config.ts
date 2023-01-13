import { create } from 'zustand';

import { invokeCommand, sendCommand } from '@/commands';
import { changeLanguage } from '@/i18n';

type Language = { label: string; value: string };

interface ConfigStore {
  config: Partial<NOTES.Config>;
  languages: Language[];
  update: (config: Partial<NOTES.Config>) => void;
  setOpenAtLogin: (bol: boolean) => void;
  changeLanguage: (lng: string) => void;
}

export const useConfigStore = create<ConfigStore>()((set) => {
  invokeCommand<NOTES.Config>('getAppConfig').then(async (config) => {
    set((state) => ({ config: { ...state.config, ...config } }));
  });

  invokeCommand<Language[]>('getI18nLanguages').then((languages) => {
    set({ languages });
  });

  const updateConfig: ConfigStore['update'] = (newValue) => {
    set((state) => ({ config: { ...state.config, ...newValue } }));
    sendCommand('updateConfig', newValue);
  };

  return {
    config: {},
    languages: [],
    update: updateConfig,
    setOpenAtLogin: (bol) => {
      const obj: Partial<NOTES.Config> = { openAtLogin: bol };
      updateConfig(obj);
      sendCommand('setOpenAtLogin', obj);
    },
    changeLanguage: async (lang) => {
      await Promise.all([changeLanguage(lang), invokeCommand('changeI18nLang', lang)]);
      updateConfig({ lang });
    },
  };
});
