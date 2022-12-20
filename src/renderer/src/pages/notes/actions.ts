import { ActionItem } from '@/utils/menu-hoc';

export const createAction: ActionItem = {
  key: 'create',
  title: '新建',
  onClick: () => {
    console.log('create');
  },
};
