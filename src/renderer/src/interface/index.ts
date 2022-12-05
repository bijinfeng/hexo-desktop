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
  tags: { name: string }[];
  categories: { name: string }[];
  title: string;
  type: string;
  date: string;
  updated: string;
  content: string;
  excerpt?: string;
}

export interface PostCategory {
  post_id: string;
  category_id: string;
  id: string;
}

export interface PostTag {
  post_id: string;
  tag_id: string;
  id: string;
}

export interface Models {
  Post: PostData[];
  Category: CategoryData[];
  Tag: TagData[];
  PostTag: PostTag[];
  PostCategory: PostCategory[];
  FolderGroup: FolderGroup[];
  Folder: FolderData[];
}

export interface Platform {
  isMacOS: boolean;
  isLinux: boolean;
  isWindows: boolean;
}
