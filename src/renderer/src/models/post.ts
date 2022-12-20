import dayjs from 'dayjs';
import { v1 as uuid } from 'uuid';
import create from 'zustand';

import { invokeCommand, sendCommand } from '@/commands';
import type { FolderData, FolderGroup, Models, PostData } from '@/interface';
import { models } from '@/interface/mock';

interface ModelStore {
  postId?: string; // 当前编辑的文档 id
  folderId?: string; // 当前打开的文件夹 id
  models: Models;
  setPostId: (id?: string) => void;
  setFolderId: (id?: string) => void;
  findParentFolder: (folderId: string) => string | undefined;
  findFolderGroup: (folderId?: string) => FolderGroup[];
  getPost: (postId: string) => PostData | undefined;
  getPostTags: (postId: string) => string[];
  addPostTag: (postId: string, tag: string) => void;
  removePostTag: (postId: string, tag: string) => void;
  createFolder: (folderId?: string) => void;
  createPost: (folderId?: string) => void;
  updatePostTitle: (postId: string, title: string) => void;
  updatePostContent: (postId: string, content: string) => void;
  updateFolderName: (folderId: string, title: string) => void;
}

export const useModelStore = create<ModelStore>()((set, get) => {
  invokeCommand<Models>('getPost').then((_models) => {
    _models && set({ models: _models });
  });

  // 更新 models
  const setModels = (_models: Partial<Models> = {}) => {
    set((state) => ({ models: { ...state.models, ..._models } }));
  };

  const findGroup = (folderId: string, group: FolderGroup[]): FolderGroup[] => {
    let target: FolderGroup[] | undefined;

    for (let index = 0; index < group.length; index++) {
      const item = group[index];

      if (item.isFolder && item.id === folderId) {
        target = item.children;
        break;
      }

      if (item.isFolder && item.children) {
        target = findGroup(folderId, item.children);

        if (target) break;
      }
    }

    return target ?? [];
  };

  const findFolderGroup = (folderId?: string): FolderGroup[] => {
    const { FolderGroup } = get().models;
    return folderId ? findGroup(folderId, FolderGroup) : FolderGroup;
  };

  const findPost = (postId: string) => {
    const { Post } = get().models;
    return Post.find((post) => post.id === postId);
  };

  const findFolder = (folderId: string) => {
    const { Folder } = get().models;
    return Folder.find((folder) => folder.id === folderId);
  };

  return {
    models,
    setPostId(id) {
      set({ postId: id });
    },
    setFolderId(id) {
      set({ folderId: id });
    },
    // 获取文件夹的内容
    findFolderGroup,
    // 寻找父级文件夹
    findParentFolder(folderId: string) {
      const { FolderGroup } = get().models;

      function isTargetGroup(group: FolderGroup[]) {
        let target: string | undefined;

        for (let index = 0; index < group.length; index++) {
          const item = group[index];
          if (item.isFolder && item.children) {
            const isTarget = item.children.find((it) => it.id === folderId);

            if (isTarget) {
              target = item.id;
              break;
            } else {
              target = isTargetGroup(item.children);
              if (target) break;
            }
          }
        }

        return target;
      }

      return isTargetGroup(FolderGroup);
    },
    // 获取文档内容
    getPost: findPost,
    // 获取文档的所有标签
    getPostTags(postId: string) {
      const { Post, Tag } = get().models;
      const tags = Post.find((post) => post.id === postId)?.tags ?? [];
      return tags.map((it) => Tag.find((category) => category.id === it)?.name ?? '');
    },
    // 新增文档标签
    addPostTag: (postId, tag) => {
      const { Post, Tag } = get().models;
      const findPost = Post.find((it) => it.id === postId);
      let findTag = Tag.find((it) => it.name === tag);

      if (!findTag) {
        findTag = { id: uuid(), name: tag };
        Tag.push(findTag);
      }

      findPost?.tags.push(findTag.id);

      set({ models: { ...models, Tag, Post } });
    },
    // 删除文档标签
    removePostTag(postId, tag) {
      const { Post, Tag } = get().models;
      const findPost = Post.find((it) => it.id === postId);
      const findTag = Tag.find((it) => it.name === tag);
      findPost?.tags.filter((it) => it === findTag?.id);

      set({ models: { ...models, Post } });
    },
    // 新建文件夹
    createFolder(folderId) {
      const { Folder } = get().models;
      const folderGroup = findFolderGroup(folderId);

      const newFolder: FolderData = {
        id: uuid(),
        name: '新建文件夹',
        date: dayjs().format(),
      };

      Folder.push(newFolder);
      folderGroup.push({ id: newFolder.id, isFolder: true });

      setModels({ Folder });
    },
    // 新建文档
    createPost(folderId) {
      const { Post } = get().models;
      const folderGroup = findFolderGroup(folderId);

      const newPost: PostData = {
        id: uuid(),
        tags: [],
        categories: [],
        title: '无标题 Markdown',
        type: 'md',
        date: dayjs().format(),
        content: '',
      };

      Post.push(newPost);
      folderGroup.push({ id: newPost.id, isFolder: false });

      setModels({ Post });
    },
    // 更新文档标题
    updatePostTitle(postId, title) {
      const post = findPost(postId);
      if (!post) return;

      post.title = title;
      setModels();
    },
    // 更新文档内容
    updatePostContent(postId, content) {
      const post = findPost(postId);
      if (!post) return;

      post.content = content;
      setModels();
    },
    // 修改文件夹名称
    updateFolderName(folderId: string, name: string) {
      const folder = findFolder(folderId);
      if (!folder) return;

      folder.name = name;
      setModels();
    },
  };
});

// 同步变动到主线程
useModelStore.subscribe((state) => {
  sendCommand('updatePost', state.models);
});
