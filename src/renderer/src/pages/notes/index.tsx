import { ResizeBox } from '@arco-design/web-react';
import React, { Suspense, useState } from 'react';

import ResizeTrigger from '@/components/resize-trigger';

import Editor from './Editor';
import List from './List';
import styles from './styles.module.less';

const Trash: React.FC = () => {
  const [postId, setPostId] = useState<string>();
  const [isMoving, setIsMoving] = useState(false);

  return (
    <Suspense>
      <ResizeBox.Split
        className={styles.container}
        direction="horizontal"
        max={0.8}
        min={0.2}
        size={0.25}
        panes={[
          <List key="first" onEditor={setPostId} />,
          <Editor key="second" postId={postId} />,
        ]}
        trigger={<ResizeTrigger isMoving={isMoving} />}
        onMovingStart={() => setIsMoving(true)}
        onMovingEnd={() => setIsMoving(false)}
      />
    </Suspense>
  );
};

export default Trash;
