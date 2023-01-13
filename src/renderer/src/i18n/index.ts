import i18next, { ResourceKey } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { invokeCommand } from '@/commands';

export const initI18next = async () => {
  const { lng, resource } = await invokeCommand<{ lng: string; resource: ResourceKey }>(
    'getI18nInitResource',
  );

  return i18next.use(initReactI18next).init({
    lng,
    resources: {
      [lng]: {
        translation: resource,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });
};

export const changeLanguage = async (lng: string) => {
  if (!i18next.hasResourceBundle(lng, 'translation')) {
    // 动态加载语言
    const resource = await invokeCommand<ResourceKey>('getI18nResource', lng);
    i18next.addResourceBundle(lng, 'translation', resource);
  }

  return i18next.changeLanguage(lng);
};

export default i18next;
