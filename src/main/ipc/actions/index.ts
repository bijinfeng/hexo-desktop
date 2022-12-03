import themeChanged from './changeAppTheme';
import checkForUpdate from './checkForUpdate';
import downloadUpdate from './downloadUpdate';
import quitAndInstall from './quitAndInstall';
import updatePost from './updatePost';

const actions = {
  themeChanged,
  checkForUpdate,
  updatePost,
  quitAndInstall,
  downloadUpdate,
};

export function getAction(actionName: keyof typeof actions) {
  try {
    if (!actions[actionName]) throw new Error('Invalid action name.');
  } catch (e) {
    console.error(e);
  }
  return actions[actionName];
}
