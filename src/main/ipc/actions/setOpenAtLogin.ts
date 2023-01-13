import { setOpenAtLogin } from '../../utils/openAtLogin';

export interface Args {
  openAtLogin: boolean;
}

export default ({ openAtLogin }: Args) => {
  setOpenAtLogin(openAtLogin);
};
