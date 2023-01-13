import { setStore } from '../../utils/store';

const updatePost = (payload: Record<string, any>) => {
  Object.keys(payload).forEach((key) => {
    setStore(`post.${key}`, payload[key]);
  });
};

export default updatePost;
