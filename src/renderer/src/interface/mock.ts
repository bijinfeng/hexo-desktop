import {
  CategoryData,
  FolderData,
  FolderGroup,
  Models,
  PostData,
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

export const mockPosts: PostData[] = [
  {
    id: 'cl0eyp64y0003hommco9w7pcw',
    content: '# xxxx\n',
    tags: ['clb36ar8l000238a3fqun3qgz'],
    categories: ['clb37w0b90000ywa34z2kfbd6'],
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
  Folder: mockFolder,
  FolderGroup: mockFolderGroup,
};
