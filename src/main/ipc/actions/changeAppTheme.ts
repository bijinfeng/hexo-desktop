import type { NativeTheme } from 'electron';

import { updateThem } from '../../utils/theme';

export interface Args {
  theme: NativeTheme['themeSource'];
}

export default ({ theme }: Args) => {
  updateThem(theme);
};
