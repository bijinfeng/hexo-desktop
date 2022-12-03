import create from 'zustand';

import { invokeCommand, sendCommand } from '@/commands';
import { AppEventManager } from '@/event';
import changeTheme from '@/utils/changeTheme';

export type Theme = 'light' | 'dark';
export type ThemeState = { system: boolean; theme: Theme };

interface ThemeStore extends ThemeState {
  loading: boolean;
  updateTheme: (theme: Theme | 'system') => void;
}

export const useThemeStore = create<ThemeStore>()((set) => {
  invokeCommand<ThemeState>('getTheme').then((themeState) => {
    changeTheme(themeState.theme);
    set({ ...themeState, loading: false });
  });

  AppEventManager.on('themeChanged', (args) => {
    changeTheme(args.theme);
    set(args);
  });

  return {
    loading: true,
    theme: 'light',
    system: true,
    updateTheme: (_theme: Theme | 'system') => {
      sendCommand('themeChanged', { theme: _theme });
      if (_theme === 'system') {
        set({ system: true });
      } else {
        set({ theme: _theme, system: false });
        changeTheme(_theme);
      }
    },
  };
});
