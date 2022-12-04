import { setOpenAtLogin } from '../../utils/openAtLogin';

export interface Args {
  payload: { openAtLogin: boolean };
}

export default ({ payload }: Args) => {
  setOpenAtLogin(payload.openAtLogin);
};
