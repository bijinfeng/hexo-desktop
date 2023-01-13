import logger from 'electron-log';

import themeChanged from './changeAppTheme';
import checkForUpdate from './checkForUpdate';
import openUrl from './openUrl';
import quitAndInstall from './quitAndInstall';
import setOpenAtLogin from './setOpenAtLogin';
import updateAttachment from './updateAttachment';
import updateConfig from './updateConfig';
import updatePost from './updatePost';

const actions = {
  themeChanged,
  checkForUpdate,
  updatePost,
  quitAndInstall,
  updateConfig,
  setOpenAtLogin,
  updateAttachment,
  openUrl,
};

export function getAction(actionName: keyof typeof actions) {
  try {
    if (!actions[actionName]) throw new Error('Invalid action name.');
  } catch (e) {
    logger.error(e);
  }
  return actions[actionName];
}
