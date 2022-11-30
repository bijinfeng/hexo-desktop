import { atom, selector } from 'recoil';

import { invokeCommand } from '@/commands';
import changeTheme from '@/utils/changeTheme';

export type Theme = 'light' | 'dark';
export type ThemeState = { system: boolean; theme: Theme };

export const themeState = atom<ThemeState>({
  key: 'themeState',
  default: selector({
    key: 'themeState/default',
    get: async () => {
      const theme = await invokeCommand<ThemeState>('getTheme');
      const lastTheme = Object.assign({ system: true, theme: 'light' }, theme);

      changeTheme(lastTheme.theme);

      return lastTheme;
    },
  }),
});
