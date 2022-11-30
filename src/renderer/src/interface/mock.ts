import { CategoryData, Models, PostCategory, PostData, PostTag, TagData } from './index';

export const mockTags: TagData[] = [
  {
    _id: 'clb36ar8l000238a3fqun3qgz',
    name: 'React Native',
  },
];

export const mockCategories: CategoryData[] = [
  {
    _id: 'clb37w0b90000ywa34z2kfbd6',
    name: '前端',
  },
];

export const mockPostCategory: PostCategory[] = [
  {
    post_id: 'cl0eyp64y0003hommco9w7pcw',
    category_id: 'clb37w0b90000ywa34z2kfbd6',
    _id: 'clb37w0bb0001ywa3f1et3b32',
  },
];

export const mockPostTag: PostTag[] = [
  {
    post_id: 'cl0eyp64y0003hommco9w7pcw',
    tag_id: 'clb36ar8l000238a3fqun3qgz',
    _id: 'clb36ar8p000538a36wakbey6',
  },
];

export const mockPosts: PostData[] = [
  {
    _id: 'cl0eyp64y0003hommco9w7pcw',
    _content: '\n## xxxx\n',
    _tags: [{ name: 'React Native' }],
    _categories: [{ name: '前端' }],
    title: '测试文档',
    date: '2022-10-18T10:54:46.000Z',
    source: '_posts/postest/test.md',
    updated: '2022-11-30T04:53:32.614Z',
    content:
      '<html><head></head><body><h2 id="xxxx"><a href="#xxxx" class="headerlink" title="xxxx"></a>xxxx</h2></body></html>',
    excerpt: '',
  },
];

export const models: Models = {
  Post: mockPosts,
  Category: mockCategories,
  Tag: mockTags,
  PostTag: mockPostTag,
  PostCategory: mockPostCategory,
};
