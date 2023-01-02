import themeChanged from './changeAppTheme';
import checkForUpdate from './checkForUpdate';
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
};

export function getAction(actionName: keyof typeof actions) {
  try {
    if (!actions[actionName]) throw new Error('Invalid action name.');
  } catch (e) {
    console.error(e);
  }
  return actions[actionName];
}
