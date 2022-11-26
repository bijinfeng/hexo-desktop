import { ResizeBox } from '@arco-design/web-react';
import React, { useState } from 'react';

import MarkdownEditor from '@/components/markdown-editor';
import ResizeTrigger from '@/components/resize-trigger';

import List from './List';
import styles from './styles.module.less';

const Trash: React.FC = () => {
  const [isMoving, setIsMoving] = useState(false);

  return (
    <ResizeBox.Split
      className={styles.container}
      direction="horizontal"
      max={0.8}
      min={0.2}
      size={0.25}
      panes={[<List key="first" />, <MarkdownEditor key="second" />]}
      trigger={<ResizeTrigger isMoving={isMoving} />}
      onMovingStart={() => setIsMoving(true)}
      onMovingEnd={() => setIsMoving(false)}
    />
  );
};

export default Trash;
