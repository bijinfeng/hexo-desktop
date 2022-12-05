import {
  CategoryData,
  FolderData,
  FolderGroup,
  Models,
  PostCategory,
  PostData,
  PostTag,
  TagData,
} from './index';

export const mockTags: TagData[] = [
  {
    id: 'clb36ar8l000238a3fqun3qgz',
    name: 'React Native',
  },
];

export const mockFolder: FolderData[] = [
  {
    id: 'xdsfsdfsfdsfsdfdsf',
    name: '我的博客',
    date: '2022-10-18T10:54:46.000Z',
  },
];

export const mockFolderGroup: FolderGroup[] = [
  {
    id: 'xdsfsdfsfdsfsdfdsf',
    isFolder: true,
    children: [
      {
        id: 'cl0eyp64y0003hommco9w7pcw',
        isFolder: false,
      },
    ],
  },
];

export const mockCategories: CategoryData[] = [
  {
    id: 'clb37w0b90000ywa34z2kfbd6',
    name: '前端',
  },
];

export const mockPostCategory: PostCategory[] = [
  {
    post_id: 'cl0eyp64y0003hommco9w7pcw',
    category_id: 'clb37w0b90000ywa34z2kfbd6',
    id: 'clb37w0bb0001ywa3f1et3b32',
  },
];

export const mockPostTag: PostTag[] = [
  {
    post_id: 'cl0eyp64y0003hommco9w7pcw',
    tag_id: 'clb36ar8l000238a3fqun3qgz',
    id: 'clb36ar8p000538a36wakbey6',
  },
];

export const mockPosts: PostData[] = [
  {
    id: 'cl0eyp64y0003hommco9w7pcw',
    content: '# xxxx\n',
    tags: [{ name: 'React Native' }],
    categories: [{ name: '前端' }],
    title: '测试文档',
    type: 'md',
    date: '2022-10-18T10:54:46.000Z',
    updated: '2022-11-30T04:53:32.614Z',
    excerpt: '',
  },
];

export const models: Models = {
  Post: mockPosts,
  Category: mockCategories,
  Tag: mockTags,
  PostTag: mockPostTag,
  PostCategory: mockPostCategory,
  Folder: mockFolder,
  FolderGroup: mockFolderGroup,
};
