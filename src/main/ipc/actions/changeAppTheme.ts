import type { NativeTheme } from 'electron';

import { updateThem } from '../../utils/theme';

export default (args: { theme: NativeTheme['themeSource'] }) => {
  const { theme } = args;

  updateThem(theme);
};
