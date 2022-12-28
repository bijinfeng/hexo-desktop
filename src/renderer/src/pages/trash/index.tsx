import React, { useState } from 'react';

import ResizeSplit from '@/components/resize-split';

import Editor from './editor';
import List from './list';

const Trash: React.FC = () => {
  const [postId, setPostId] = useState<string>();

  return (
    <ResizeSplit
      panes={[
        <List key="first" postId={postId} setPostId={setPostId} />,
        <Editor key="second" postId={postId} />,
      ]}
    />
  );
};

export default Trash;
