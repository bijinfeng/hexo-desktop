import React from 'react';

import ResizeSplit from '@/components/resize-split';

import Editor from './Editor';
import List from './List';

const Trash: React.FC = () => {
  return <ResizeSplit panes={[<List key="first" />, <Editor key="second" />]} />;
};

export default Trash;
