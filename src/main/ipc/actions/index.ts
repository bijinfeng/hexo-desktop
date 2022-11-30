import themeChanged from './changeAppTheme';
import checkAppVersion from './checkAppVersion';
import checkForUpdate from './checkForUpdate';
import updatePost from './updatePost';

const actions = {
  themeChanged,
  checkAppVersion,
  checkForUpdate,
  updatePost,
};

export function getAction(actionName: keyof typeof actions) {
  try {
    if (!actions[actionName]) throw new Error('Invalid action name.');
  } catch (e) {
    console.error(e);
  }
  return actions[actionName];
}
