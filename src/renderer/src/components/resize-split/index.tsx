import { ResizeBox } from '@arco-design/web-react';
import React, { useState } from 'react';

import ResizeTrigger from '@/components/resize-trigger';

export interface ResizeSplitProps {
  panes: React.ReactNode[];
}

const ResizeSplit: React.FC<ResizeSplitProps> = ({ panes }) => {
  const [isMoving, setIsMoving] = useState(false);

  return (
    <ResizeBox.Split
      className="h-full"
      direction="horizontal"
      max={0.8}
      min={0.2}
      size={0.25}
      panes={panes}
      trigger={<ResizeTrigger isMoving={isMoving} />}
      onMovingStart={() => setIsMoving(true)}
      onMovingEnd={() => setIsMoving(false)}
    />
  );
};

export default ResizeSplit;
