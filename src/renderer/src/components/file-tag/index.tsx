import { Input, Tag } from '@arco-design/web-react';
import { IconSubscribed } from '@arco-design/web-react/icon';
import React, { useState } from 'react';

import styles from './style.module.less';

interface FileTagProps {
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
}

const FileTag: React.FC<FileTagProps> = ({ tags, addTag, removeTag }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddTag = () => {
    if (inputValue) {
      !tags.includes(inputValue) && addTag(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className={styles.box}>
      <IconSubscribed className={styles.icon} />
      <div className={styles.tags}>
        {tags.map((tag) => (
          <Tag key={tag} closable onClose={() => removeTag(tag)}>
            {tag}
          </Tag>
        ))}
      </div>
      <Input
        size="mini"
        placeholder="输入后按回车键"
        value={inputValue}
        className={styles.input}
        onPressEnter={handleAddTag}
        onBlur={handleAddTag}
        onChange={setInputValue}
      />
    </div>
  );
};

export default FileTag;
