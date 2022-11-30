import Store from 'electron-store';

export const store = new Store({ defaults: { theme: 'system' } });

export const getStore = <V>(key: string) => store.get<string, V>(key);
export const setStore = <V>(key: string, value: V) => store.set(key, value);
