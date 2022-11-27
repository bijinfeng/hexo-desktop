import { Input, Tag } from '@arco-design/web-react';
import { IconSubscribed } from '@arco-design/web-react/icon';
import React, { useState } from 'react';

import styles from './style.module.less';

const FileTag: React.FC = () => {
  const [tags, setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3']);
  const [inputValue, setInputValue] = useState('');

  const addTag = () => {
    if (inputValue) {
      tags.push(inputValue);
      setTags(tags);
      setInputValue('');
    }
  };

  const removeTag = (removeTag: string) => {
    const newTags = tags.filter((tag) => tag !== removeTag);
    setTags(newTags);
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
        onPressEnter={addTag}
        onBlur={addTag}
        onChange={setInputValue}
      />
    </div>
  );
};

export default FileTag;
