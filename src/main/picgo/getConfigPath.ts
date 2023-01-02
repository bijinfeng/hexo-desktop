import { app as APP } from 'electron';
import logger from 'electron-log';
import fs from 'fs-extra';
import path from 'path';

const STORE_PATH = APP.getPath('userData');
const configFilePath = path.join(STORE_PATH, 'data.json');
export const defaultConfigPath = configFilePath;

let _configFilePath = '';

export const getConfigPath = () => {
  if (_configFilePath) {
    return _configFilePath;
  }
  // defaultConfigPath
  _configFilePath = defaultConfigPath;
  // if defaultConfig path is not exit
  // do not parse the content of config
  if (!fs.existsSync(defaultConfigPath)) {
    return _configFilePath;
  }

  try {
    const configString = fs.readFileSync(defaultConfigPath, { encoding: 'utf-8' });
    const config = JSON.parse(configString);
    const userConfigPath: string = config.configPath || '';
    if (userConfigPath) {
      if (fs.existsSync(userConfigPath) && userConfigPath.endsWith('.json')) {
        _configFilePath = userConfigPath;
        return _configFilePath;
      }
    }
    return _configFilePath;
  } catch (e) {
    logger.error(e);
    _configFilePath = defaultConfigPath;
    return _configFilePath;
  }
};
