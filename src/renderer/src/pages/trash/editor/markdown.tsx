import { IconDelete, IconReply } from '@arco-design/web-react/icon';
import React from 'react';

import Editors from '@/components/editor';
import IconButton from '@/components/icon-button';
import Illus from '@/components/illus';
import { useModelStore } from '@/models/post';

interface MarkdownProps {
  postId: string;
}

const Markdown: React.FC<MarkdownProps> = ({ postId }) => {
  const { replyPostFromTrash, deletePost } = useModelStore();
  const post = useModelStore((state) => (postId ? state.getPost(postId) : undefined));

  if (!post) return <Illus.Empty />;

  return (
    <Editors
      key={post.id}
      editable={false}
      title={post.title}
      titleSuffix={
        <>
          <IconButton tooltip="恢复" onClick={() => replyPostFromTrash(post.id)}>
            <IconReply fontSize={22} />
          </IconButton>
          <IconButton tooltip="永久删除" onClick={() => deletePost(post.id)}>
            <IconDelete fontSize={22} />
          </IconButton>
        </>
      }
    >
      <Editors.Markdown value={post.content} editable={false} />
    </Editors>
  );
};

export default Markdown;
