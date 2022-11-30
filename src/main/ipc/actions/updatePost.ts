import { setStore } from '../../utils/store';

const updatePost = (values: Record<string, any>) => {
  Object.keys(values).forEach((key) => {
    setStore(`post.${key}`, values[key]);
  });
};

export default updatePost;
