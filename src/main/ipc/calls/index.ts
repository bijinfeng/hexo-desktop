import getAppConfig from './getAppConfig';
import getTheme from './getAppTheme';
import getAppVersion from './getAppVersion';
import getPlatform from './getPlatform';
import getPost from './getPost';

const calls = {
  getTheme,
  getPost,
  getPlatform,
  getAppVersion,
  getAppConfig,
};

export const getCall = function getAction(callName: string) {
  try {
    if (!calls[callName]) throw new Error('Invalid call name.');
  } catch (e) {
    console.error(e);
  }
  return calls[callName];
};
