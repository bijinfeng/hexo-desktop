import { isFunction } from 'lodash-es';
import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { sendCommand } from '@/commands';
import { AppEventManager } from '@/event';
import { Theme, themeState } from '@/models/theme';
import changeTheme from '@/utils/changeTheme';

type ThemeEnum = Theme | 'system';

const useTheme = () => {
  const [theme, _setTheme] = useRecoilState(themeState);

  const setTheme: typeof _setTheme = useCallback(
    (args) => {
      const newTheme = isFunction(args) ? args(theme) : args;
      changeTheme(newTheme.theme);
      _setTheme(newTheme);
    },
    [theme],
  );

  useEffect(() => {
    AppEventManager.on('themeChanged', setTheme);

    return () => {
      AppEventManager.removeListener('themeChanged', setTheme);
    };
  }, []);

  const updateTheme = useCallback((_theme: ThemeEnum) => {
    sendCommand('themeChanged', { theme: _theme });

    if (_theme === 'system') {
      setTheme((oldThem) => ({ ...oldThem, system: true }));
    } else {
      setTheme({ theme: _theme, system: false });
    }
  }, []);

  return { theme, updateTheme };
};

export default useTheme;
