import type { NativeTheme } from 'electron';

import { updateThem } from '../../utils/theme';

export interface Args {
  payload: {
    theme: NativeTheme['themeSource'];
  };
}

export default ({ payload: { theme } }: Args) => {
  updateThem(theme);
};
