import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useEffect, useState } from 'react';

import { invokeCommand } from '@/commands/index';
import { AppEventManager } from '@/event';
import changeTheme from '@/utils/changeTheme';

export type Theme = 'light' | 'dark';
export type ThemeEnum = 'light' | 'dark' | 'system';

export interface GlobalContextState {
  isSystemTheme: boolean;
  theme: Theme;
  updateTheme: (theme: ThemeEnum) => void;
}

export const GlobalContext = createContext<GlobalContextState>({} as GlobalContextState);

export const GlobalContextProvider = ({ children }: PropsWithChildren) => {
  const [isSystemTheme, setIsSystemTheme] = useState(false);
  const [theme, _setTheme] = useState<Theme>('light');

  const setTheme = useCallback((t: Theme) => {
    changeTheme(t);
    _setTheme(t);
  }, []);

  useEffect(() => {
    function onThemeChanged({ theme, system }: { theme: Theme; system: boolean }) {
      console.log(theme, system);
      setTheme(theme);
      setIsSystemTheme(system);
    }

    AppEventManager.on('themeChanged', onThemeChanged);

    return () => {
      AppEventManager.removeListener('themeChanged', onThemeChanged);
    };
  }, []);

  const updateTheme = useCallback((_theme: ThemeEnum) => {
    invokeCommand('themeChanged', { theme: _theme });

    if (_theme === 'system') {
      setIsSystemTheme(true);
    } else {
      setIsSystemTheme(false);
      setTheme(_theme);
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ isSystemTheme, theme, updateTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};
