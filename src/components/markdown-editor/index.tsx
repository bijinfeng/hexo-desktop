import 'bytemd/dist/index.css';

import { Input } from '@arco-design/web-react';
import { IconFindReplace, IconMore, IconSwap } from '@arco-design/web-react/icon';
import gfm from '@bytemd/plugin-gfm';
import { Editor } from '@bytemd/react';
import React, { useState } from 'react';

import IconButton from '@/components/icon-button';

import styles from './styles.module.less';

const plugins = [
  gfm(),
  // Add more plugins here
];

const MarkdownEditor: React.FC = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Input className={styles.title} />
        <IconButton>
          <IconSwap className={styles.icon} />
        </IconButton>
        <IconButton>
          <IconFindReplace className={styles.icon} />
        </IconButton>
        <IconButton>
          <IconMore className={styles.icon} />
        </IconButton>
      </div>
      <Editor mode={'split'} value={value} plugins={plugins} onChange={setValue} />
    </div>
  );
};

export default MarkdownEditor;
