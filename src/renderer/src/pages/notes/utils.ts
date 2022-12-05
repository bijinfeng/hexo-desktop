import { FolderGroup } from '@/interface';

export const findFolderGroup = (id: string, group: FolderGroup[]): FolderGroup[] => {
  let target: FolderGroup[] | undefined;

  for (let index = 0; index < group.length; index++) {
    const item = group[index];

    if (item.isFolder && item.id === id) {
      target = item.children;
      break;
    }

    if (item.isFolder && item.children) {
      target = findFolderGroup(id, item.children);

      if (target) break;
    }
  }

  return target ?? [];
};
