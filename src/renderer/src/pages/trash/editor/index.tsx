import { IconDelete, IconReply } from '@arco-design/web-react/icon';
import React from 'react';

import Editors from '@/components/editor';
import IconButton from '@/components/icon-button';
import Illus from '@/components/illus';
import { useModelStore } from '@/models/post';

interface EditorProps {
  postId?: string;
}

const Editor: React.FC<EditorProps> = ({ postId }) => {
  const { replyPostFromTrash, deletePost } = useModelStore();
  const post = useModelStore((state) => (postId ? state.getPost(postId) : undefined));

  return (
    <div className="h-full bg-bg-1">
      {post ? (
        <Editors
          key={post.id}
          editable={false}
          title={post.title}
          content={post.content}
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
        />
      ) : (
        <Illus.Empty />
      )}
    </div>
  );
};

export default Editor;
