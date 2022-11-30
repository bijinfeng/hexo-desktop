// 分类
export interface CategoryData {
  _id: string;
  name: string;
}

// 标签
export interface TagData {
  _id: string;
  name: string;
}

export interface PostData {
  _id: string;
  _content: string;
  _tags: { name: string }[];
  _categories: { name: string }[];
  title: string;
  date: string;
  source: string;
  updated: string;
  content: string;
  excerpt?: string;
}

export interface PostCategory {
  post_id: string;
  category_id: string;
  _id: string;
}

export interface PostTag {
  post_id: string;
  tag_id: string;
  _id: string;
}

export interface Models {
  Post: PostData[];
  Category: CategoryData[];
  Tag: TagData[];
  PostTag: PostTag[];
  PostCategory: PostCategory[];
}
