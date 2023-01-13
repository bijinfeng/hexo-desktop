import { setConfigStore } from '../../utils/store';

export default (payload: Partial<NOTES.Config>) => {
  setConfigStore(payload);
};
