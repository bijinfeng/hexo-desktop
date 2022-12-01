import { atom, selector } from 'recoil';

import { invokeCommand } from '@/commands';
import type { Models } from '@/interface';
import { models } from '@/interface/mock';

export const modelState = atom<Models>({
  key: 'modelState',
  default: selector({
    key: 'modelState/default',
    get: async () => {
      const posts = await invokeCommand<Models>('getPost');
      return posts || models;
    },
  }),
});

export const postState = selector({
  key: 'postState',
  get: ({ get }) => {
    const models = get(modelState);

    return models.Post;
  },
  set: ({ set }, newValue) => {
    set(modelState, (pre) => {
      return { ...pre, Post: newValue } as Models;
    });
  },
});

export const tagState = selector({
  key: 'tagState',
  get: ({ get }) => {
    const models = get(modelState);

    return models.Tag;
  },
});
