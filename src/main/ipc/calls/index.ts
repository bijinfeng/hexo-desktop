import getTheme from './getAppTheme';
import getPost from './getPost';

const calls = {
  getTheme,
  getPost,
};

export const getCall = function getAction(callName: string) {
  try {
    if (!calls[callName]) throw new Error('Invalid call name.');
  } catch (e) {
    console.error(e);
  }
  return calls[callName];
};
