import { setStore } from '../../utils/store';

export interface Args {
  payload: Record<string, any>;
}

const updatePost = ({ payload }: Args) => {
  Object.keys(payload).forEach((key) => {
    setStore(`post.${key}`, payload[key]);
  });
};

export default updatePost;
