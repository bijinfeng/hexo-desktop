import i18next from 'i18next';
import i18nextBackend from 'i18next-fs-backend';
import path from 'path';

import { getConfigStore } from './store';

export const LngOptions = [
  {
    label: '简体中文',
    value: 'zh-CN',
  },
  {
    label: 'English',
    value: 'en-US',
  },
];

i18next.use(i18nextBackend).init({
  lng: getConfigStore('lang') || 'zh-CN',
  fallbackLng: 'en-US',
  backend: {
    loadPath: path.join(__dirname, './i18n/{{lng}}.json'),
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18next;
