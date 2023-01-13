import getAppConfig from './getAppConfig';
import getTheme from './getAppTheme';
import getAppVersion from './getAppVersion';
import getAttachment from './getAttachment';
import getPlatform from './getPlatform';
import getPost from './getPost';
import * as I18n from './i18n';
import * as pic from './pic';

const calls = {
  getTheme,
  getPost,
  getPlatform,
  getAppVersion,
  getAppConfig,
  getAttachment,
  ...I18n,
  ...pic,
};

export const getCall = function getAction(callName: string) {
  try {
    if (!calls[callName]) throw new Error('Invalid call name.');
  } catch (e) {
    console.error(e);
  }
  return calls[callName];
};
