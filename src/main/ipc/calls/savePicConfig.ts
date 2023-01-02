import picgo from '../../picgo';

export interface Args {
  payload: Record<string, any>;
}

export default ({ payload: data }: Args) => {
  return picgo.saveConfig(data);
};
