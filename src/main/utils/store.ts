import Store from 'electron-store';

export interface StoreState {
  theme: string;
  config: Config;
}

export const store = new Store<StoreState>({
  defaults: { theme: 'system', config: { autoUpgrade: false, openAtLogin: false } },
});

export const getStore = <V>(key: string) => store.get<string, V>(key);
export const setStore = <V>(key: string, value: V) => store.set(key, value);

// 用户设置
export interface Config {
  openAtLogin: boolean;
  autoUpgrade: boolean;
}

export const getAllConfigStore = () => getStore<Config>('config');
export const getConfigStore = <K extends keyof Config>(key: K) => {
  return getStore<Config[K]>(`config.${key}`);
};
export const setConfigStore = (value: Partial<Config>) => {
  const config = getAllConfigStore();
  return setStore('config', { ...config, ...value });
};
