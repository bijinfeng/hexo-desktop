import React from 'react';

import ResizeSplit from '@/components/resize-split';

const Collect: React.FC = () => {
  return <ResizeSplit panes={[<div key="first" />]} />;
};

export default Collect;
