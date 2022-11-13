import { default_reporter, diary, enable } from 'diary';
import { app } from 'electron';
import { createWriteStream } from 'fs';
import { join } from 'path';

import { isDevelopment } from '../utils';

enable('native');

const LOG_FILE_PATH = join(app.getPath('logs'), 'notesnook.log');
const logFileStream = createWriteStream(LOG_FILE_PATH, {
  autoClose: true,
  flags: 'a',
});

const native = diary('native', (e) => {
  if (isDevelopment()) default_reporter(e);
  logFileReporter(e);
});

function logFileReporter(e) {
  const time = new Date().toLocaleString('en', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const extra = e.extra.map((ex) => JSON.stringify(ex)).join(' ');
  const str = `[${time}] | ${e.level} | ${e.message} ${extra}\n`;
  logFileStream.write(str);
}

export const logger = native;
