import { ResizeBox } from '@arco-design/web-react';
import React from 'react';

import MarkdownEditor from '@/components/markdown-editor';

import List from './List';
import styles from './styles.module.less';

const Trash: React.FC = () => {
  return (
    <ResizeBox.Split
      className={styles.container}
      direction="horizontal"
      max={0.8}
      min={0.2}
      size={0.25}
      panes={[<List key="first" />, <MarkdownEditor key="second" />]}
    />
  );
};

export default Trash;
