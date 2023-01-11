import i18n from 'i18next';
import { reduce } from 'lodash-es';
import { initReactI18next } from 'react-i18next';

import enUS from './locales/en-US';
import zhCN from './locales/zh-CN';

export const lngMaps = {
  'zh-CN': {
    label: '中文',
    locale: zhCN,
  },
  'en-US': {
    label: 'English',
    locale: enUS,
  },
};

export const initI18n = (lng = 'zh-CN') => {
  const resources = reduce(
    lngMaps,
    (result, item, key) => {
      return { ...result, [key]: { translation: item.locale } };
    },
    {},
  );

  return i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      lng,
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });
};
