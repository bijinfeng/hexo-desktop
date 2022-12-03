import Store from 'electron-store';

export interface StoreState {
  theme: string;
  config: Config;
}

export const store = new Store<StoreState>({
  defaults: { theme: 'system', config: { autoUpgrade: false } },
});

export const getStore = <V>(key: string) => store.get<string, V>(key);
export const setStore = <V>(key: string, value: V) => store.set(key, value);

// 用户设置
export interface Config {
  autoUpgrade: boolean;
}

export const getAllConfigStore = () => getStore<Config>('config');
export const getConfigStore = <K extends keyof Config>(key: K) => {
  return getStore<Config[K]>(`config.${key}`);
};
export const setConfigStore = <K extends keyof Config>(key: K, value: Config[K]) => {
  return setStore(`config.${key}`, value);
};
