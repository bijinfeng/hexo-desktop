import picgo from '../../picgo';

export interface Args {
  payload: string[];
}

export default ({ payload }: Args) => {
  return picgo.upload(payload);
};
