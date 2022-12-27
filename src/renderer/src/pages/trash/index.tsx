import React from 'react';

import ResizeSplit from '@/components/resize-split';

import List from './list';

const Trash: React.FC = () => {
  return <ResizeSplit panes={[<List key="first" />]} />;
};

export default Trash;
