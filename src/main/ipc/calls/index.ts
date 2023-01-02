import { getPicBeds } from '../../picgo';
import getAppConfig from './getAppConfig';
import getTheme from './getAppTheme';
import getAppVersion from './getAppVersion';
import getAttachment from './getAttachment';
import getPicBedConfig from './getPicBedConfig';
import getPicConfig from './getPicConfig';
import getPlatform from './getPlatform';
import getPost from './getPost';
import picUpload from './picUpload';
import savePicConfig from './savePicConfig';

const calls = {
  getTheme,
  getPost,
  getPlatform,
  getAppVersion,
  getAppConfig,
  getPicBedConfig,
  getPicBeds,
  getPicConfig,
  savePicConfig,
  picUpload,
  getAttachment,
};

export const getCall = function getAction(callName: string) {
  try {
    if (!calls[callName]) throw new Error('Invalid call name.');
  } catch (e) {
    console.error(e);
  }
  return calls[callName];
};
