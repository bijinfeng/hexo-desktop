import Store from 'electron-store';

export interface StoreState {
  theme: string;
  config: NOTES.Config;
}

export const store = new Store<StoreState>({
  defaults: {
    theme: 'system',
    config: { lang: 'zh-CN', autoUpgrade: false, openAtLogin: false },
  },
});

export const getStore = <V>(key: string) => store.get<string, V>(key);
export const setStore = <V>(key: string, value: V) => store.set(key, value);

export const getAllConfigStore = () => getStore<NOTES.Config>('config');
export const getConfigStore = <K extends keyof NOTES.Config>(key: K) => {
  return getStore<NOTES.Config[K]>(`config.${key}`);
};
export const setConfigStore = (value: Partial<NOTES.Config>) => {
  const config = getAllConfigStore();
  return setStore('config', { ...config, ...value });
};
