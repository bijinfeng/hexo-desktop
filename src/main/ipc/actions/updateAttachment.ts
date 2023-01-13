import { setStore } from '../../utils/store';

export default (payload: any[]) => {
  setStore('attachment', payload);
};
