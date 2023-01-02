import { getPicBedConfig } from '../../picgo';

export interface Args {
  payload: {
    type: string;
  };
}

export default ({ payload: { type } }: Args) => {
  return getPicBedConfig(type);
};
