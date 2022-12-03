import create from 'zustand';

import { invokeCommand } from '@/commands';
import type { Models } from '@/interface';
import { models } from '@/interface/mock';

interface ModelStore {
  models: Models;
}

export const useModelStore = create<ModelStore>()((set) => {
  invokeCommand<Models>('getPost').then((_models) => {
    _models && set({ models: _models });
  });

  return {
    models,
  };
});
