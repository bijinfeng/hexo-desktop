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

export interface FolderGroup {
  id: string;
  isFolder: boolean;
  children?: FolderGroup[];
}

// 目录
export interface FolderData {
  id: string;
  name: string;
  date: string;
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
  updated?: string;
  excerpt?: string;
}

export interface Models {
  Post: PostData[];
  Category: CategoryData[];
  Tag: TagData[];
  FolderGroup: FolderGroup[];
  Folder: FolderData[];
}

export interface Platform {
  isMacOS: boolean;
  isLinux: boolean;
  isWindows: boolean;
}
