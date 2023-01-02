import picgo from '../../picgo';

export interface Args {
  payload: {
    path?: string;
  };
}

export default ({ payload: { path } }: Args) => {
  return picgo.getConfig(path);
};
