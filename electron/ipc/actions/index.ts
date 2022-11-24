import changeAppTheme from './changeAppTheme';

const actions = {
  themeChanged: changeAppTheme,
};

export function getAction(actionName) {
  try {
    if (!actions[actionName]) throw new Error('Invalid action name.');
  } catch (e) {
    console.error(e);
  }
  return actions[actionName];
}
