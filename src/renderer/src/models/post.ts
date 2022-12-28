import dayjs from 'dayjs';
import { v1 as uuid } from 'uuid';
import create from 'zustand';

import { invokeCommand, sendCommand } from '@/commands';
import type { FolderData, FolderItemData, Models, PostData } from '@/interface';
import { models } from '@/interface/mock';

interface ModelStore {
  postId?: string; // 当前编辑的文档 id
  folderId: string; // 当前打开的文件夹 id
  models: Models;
  setPostId: (id?: string) => void;
  setFolderId: (id?: string) => void;
  findParentFolder: (folderId: string) => string;
  findFolderGroup: (folderId?: string) => FolderItemData[];
  getPost: (postId: string) => PostData | undefined;
  getPostTags: (postId: string) => string[];
  addPostTag: (postId: string, tag: string) => void;
  removePostTag: (postId: string, tag: string) => void;
  createFolder: (folderId?: string) => void;
  createPost: (folderId?: string) => void;
  updatePostTitle: (postId: string, title: string) => void;
  updatePostContent: (postId: string, content: string) => void;
  updateFolderName: (folderId: string, title: string) => void;
  movePostToTrash: (postId: string) => void;
  moveFolderToTrash: (folderId: string) => void;
  replyPostFromTrash: (postId: string) => void;
  replyFolderFromTrash: (folderId: string) => void;
  deletePost: (postId: string) => void;
  delelteFolder: (folderId: string) => void;
  collect: (postId: string) => void;
  cancelCollect: (postId: string) => void;
  findCollect: () => FolderItemData[];
  findTrash: () => FolderItemData[];
  findFolder: (folderId: string) => FolderData | undefined;
}

export const useModelStore = create<ModelStore>()((set, get) => {
  invokeCommand<Models>('getPost').then((_models) => {
    _models && set({ models: _models });
  });

  // 更新 models
  const setModels = (_models: Partial<Models> = {}) => {
    set((state) => ({ models: { ...state.models, ..._models } }));
  };

  /**
   * 获取文件夹的内容
   * @param folderId 文件夹 id
   * @param widthTrash 是否包含回收站中的内容
   * @returns
   */
  const findFolderGroup = (folderId = '', widthTrash = false): FolderItemData[] => {
    const { Folder, Post } = get().models;

    const targetFolder = Folder.reduce<FolderItemData[]>((result, it) => {
      if (it.parentId === folderId && (!it.trash || widthTrash)) {
        result.push({ type: 'folder', id: it.id });
      }
      return result;
    }, []);

    const targetPost = Post.reduce<FolderItemData[]>((result, it) => {
      if (it.parentId === folderId && (!it.trash || widthTrash)) {
        result.push({ type: 'post', id: it.id });
      }
      return result;
    }, []);

    return targetFolder.concat(targetPost);
  };

  const findPost = (postId: string) => {
    const { Post } = get().models;
    return Post.find((post) => post.id === postId);
  };

  const findFolder = (folderId: string) => {
    const { Folder } = get().models;
    return Folder.find((folder) => folder.id === folderId);
  };

  // 删除文章
  const deletePost = (postList: PostData[], postId: string): PostData[] => {
    return postList.filter((post) => post.id !== postId);
  };

  // 删除文件夹
  const delelteFolder = (
    folderList: FolderData[],
    postList: PostData[],
    folderId: string,
  ): [FolderData[], PostData[]] => {
    // 子文件夹
    const childrenFolderList = folderList.filter(
      (folder) => folder.parentId === folderId,
    );
    // 过滤掉文件夹本身及其子文件夹
    const lastFolderList = folderList.filter(
      (folder) => folder.id !== folderId && folder.parentId !== folderId,
    );
    // 过滤掉文件夹下的文章
    const lastPostList = postList.filter((post) => post.parentId !== folderId);

    // 递归删除子文件夹
    return childrenFolderList.reduce<[FolderData[], PostData[]]>(
      (result, folder) => delelteFolder(result[0], result[1], folder.id),
      [lastFolderList, lastPostList],
    );
  };

  return {
    models,
    folderId: '',
    setPostId(id) {
      set({ postId: id });
    },
    setFolderId(id) {
      set({ folderId: id });
    },
    findFolder,
    // 获取文件夹的内容
    findFolderGroup,
    // 寻找父级文件夹
    findParentFolder(folderId: string) {
      const { Folder } = get().models;

      return Folder.find((it) => it.id === folderId)?.parentId || '';
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
    createFolder(folderId = '') {
      const { Folder } = get().models;

      const newFolder: FolderData = {
        id: uuid(),
        name: '新建文件夹',
        date: dayjs().format(),
        parentId: folderId,
      };

      Folder.push(newFolder);

      setModels({ Folder });
    },
    // 新建文档
    createPost(folderId = '') {
      const { Post } = get().models;

      const newPost: PostData = {
        id: uuid(),
        tags: [],
        categories: [],
        title: '无标题 Markdown',
        type: 'md',
        date: dayjs().format(),
        content: '',
        parentId: folderId,
      };

      Post.push(newPost);

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
    // 删除文章（进入回收站）
    movePostToTrash(postId: string) {
      const { Post } = get().models;
      setModels({
        Post: Post.map((it) =>
          it.id === postId ? { ...it, trash: true, trashed: dayjs().format() } : it,
        ),
      });
    },
    // 恢复文章（从回收站）
    replyPostFromTrash(postId: string) {
      const currentPostId = get().postId;
      const { Post } = get().models;

      set((state) => ({
        postId: currentPostId === postId ? '' : currentPostId,
        models: {
          ...state.models,
          ...{
            Post: Post.map((it) =>
              it.id === postId ? { ...it, trash: false, trashed: dayjs().format() } : it,
            ),
          },
        },
      }));
    },
    // 删除文件夹（进入回收站）
    moveFolderToTrash(folderId: string) {
      const { Folder } = get().models;
      setModels({
        Folder: Folder.map((it) =>
          it.id === folderId ? { ...it, trash: true, trashed: dayjs().format() } : it,
        ),
      });
    },
    // 恢复文件夹（从回收站）
    replyFolderFromTrash(folderId: string) {
      const { Folder } = get().models;
      setModels({
        Folder: Folder.map((it) =>
          it.id === folderId ? { ...it, trash: false, trashed: dayjs().format() } : it,
        ),
      });
    },
    // 删除文章
    deletePost(postId: string) {
      const { Post } = get().models;
      setModels({ Post: deletePost(Post, postId) });
    },
    // 删除文件夹
    delelteFolder(folderId: string) {
      const { Folder, Post } = get().models;
      const [newFolder, newPost] = delelteFolder(Folder, Post, folderId);
      setModels({ Folder: newFolder, Post: newPost });
    },
    // 收藏文章
    collect(postId: string) {
      const { Post } = get().models;
      setModels({
        Post: Post.map((it) => (it.id === postId ? { ...it, collect: true } : it)),
      });
    },
    // 取消收藏文章
    cancelCollect(postId: string) {
      const { Post } = get().models;
      setModels({
        Post: Post.map((it) => (it.id === postId ? { ...it, collect: false } : it)),
      });
    },
    // 查询收藏的文章列表
    findCollect() {
      const { Post } = get().models;
      return Post.filter((it) => it.collect).map((it) => ({ type: 'post', id: it.id }));
    },
    // 回收站
    findTrash() {
      const { Folder, Post } = get().models;

      const targetFolder = Folder.reduce<FolderItemData[]>((result, it) => {
        if (it.trash) {
          result.push({ id: it.id, type: 'folder' });
        }
        return result;
      }, []);

      const targetPost = Post.reduce<FolderItemData[]>((result, it) => {
        if (it.trash) {
          result.push({ id: it.id, type: 'post' });
        }
        return result;
      }, []);

      return targetFolder.concat(targetPost);
    },
  };
});

// 同步变动到主线程
useModelStore.subscribe((state) => {
  sendCommand('updatePost', state.models);
});
