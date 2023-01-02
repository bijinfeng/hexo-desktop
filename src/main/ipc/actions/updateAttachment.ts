import { setStore } from '../../utils/store';

export interface Args {
  payload: any[];
}

export default ({ payload }: Args) => {
  setStore('attachment', payload);
};
