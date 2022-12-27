// 目录列表项
export interface FolderItemData {
  type: 'folder' | 'post';
  id: string;
}

// 分类
export interface CategoryData {
  id: string;
  name: string;
}

// 标签
export interface TagData {
  id: string;
  name: string;
}

// 文件夹
export interface FolderData {
  id: string;
  name: string;
  date: string;
  parentId: string; // 父节点id，为空时表示在根节点
  trash?: boolean;
  trashed?: string;
  updated?: string;
}

export interface PostData {
  id: string;
  tags: string[];
  categories: string[];
  title: string;
  type: string;
  date: string;
  content: string;
  parentId: string; // 父节点id，为空时表示在根节点
  trash?: boolean;
  trashed?: string;
  collect?: boolean;
  updated?: string;
  excerpt?: string;
}

export interface Models {
  Post: PostData[];
  Category: CategoryData[];
  Tag: TagData[];
  Folder: FolderData[];
}

export interface Platform {
  isMacOS: boolean;
  isLinux: boolean;
  isWindows: boolean;
}
