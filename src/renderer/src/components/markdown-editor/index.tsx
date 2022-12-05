import 'bytemd/dist/index.css';

import { Input } from '@arco-design/web-react';
import { IconFindReplace, IconMore } from '@arco-design/web-react/icon';
import gfm from '@bytemd/plugin-gfm';
import { Editor } from '@bytemd/react';
import cls from 'classnames';
import React, { useState } from 'react';

import { ReactComponent as MdSwitch } from '@/assets/icons/md-switch.svg';
import ActionDropdown, { DropItem } from '@/components/action-dropdown';
import FileTag from '@/components/file-tag';
import IconButton from '@/components/icon-button';
import type { PostData } from '@/interface';

import styles from './styles.module.less';

const plugins = [
  gfm(),
  // Add more plugins here
];

const actions: DropItem[] = [
  { key: '1', title: '分屏编辑' },
  { key: '2', title: '所见即所得' },
  { key: '3', title: '预览模式' },
];

interface MarkdownEditorProps {
  post: PostData;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ post }) => {
  const [value, setValue] = useState(post.content);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Input className={styles.title} value={post.title} />
        <ActionDropdown drops={actions}>
          <MdSwitch className={cls('arco-icon', styles.icon)} />
        </ActionDropdown>
        <IconButton>
          <IconFindReplace className={styles.icon} />
        </IconButton>
        <IconButton>
          <IconMore className={styles.icon} />
        </IconButton>
      </div>
      <FileTag />
      <div className={styles.editor}>
        <Editor mode={'split'} value={value} plugins={plugins} onChange={setValue} />
      </div>
    </div>
  );
};

export default MarkdownEditor;
