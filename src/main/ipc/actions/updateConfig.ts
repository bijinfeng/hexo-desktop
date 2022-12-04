import { Config, setConfigStore } from '../../utils/store';

export interface Args {
  payload: Partial<Config>;
}

export default ({ payload }: Args) => {
  setConfigStore(payload);
};
