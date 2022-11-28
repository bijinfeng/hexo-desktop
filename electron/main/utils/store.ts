import Store from 'electron-store';

export const store = new Store({ defaults: { theme: 'system' } });

export const getTheme = () => store.get('theme');
export const setTheme = (theme: string) => store.set('theme', theme);
