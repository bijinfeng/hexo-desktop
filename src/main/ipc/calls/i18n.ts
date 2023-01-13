import logger from 'electron-log';

import i18next, { LngOptions } from '../../utils/i18n';

export const getI18nLanguages = () => {
  return LngOptions;
};

export const getI18nInitResource = async () => {
  const lng = i18next.language;
  const resource = await getI18nResource(lng);

  return { lng, resource };
};

export const getI18nResource = async (lng: string) => {
  await i18next.loadLanguages(lng).catch((err) => {
    logger.error(err);
  });

  return i18next.getResourceBundle(lng, '');
};

export const changeI18nLang = async (lng: string) => {
  return new Promise<boolean>((resolve) => {
    i18next.changeLanguage(lng, (err) => {
      if (err) logger.error(err);
      resolve(!err);
    });
  });
};
