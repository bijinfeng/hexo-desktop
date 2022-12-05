import { Input, List } from '@arco-design/web-react';
import { IconSearch } from '@arco-design/web-react/icon';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import ListOrder from '@/components/list-order';
import type { FolderGroup } from '@/interface';
import { useModelStore } from '@/models/post';

import styles from '../styles.module.less';
import { findFolderGroup } from '../utils';
import BackHead from './back-head';
import FileItem from './file-item';
import FolderItem from './folder-item';

interface ListSliderProps {
  onEditor: (id: string) => void;
}

const ListSlider: React.FC<ListSliderProps> = ({ onEditor }) => {
  const preFolderId = useRef<string[]>([]);
  const [folderId, setFolderId] = useState<string>();
  const folderGroup = useModelStore((state) => state.models.FolderGroup);

  const group = useMemo(() => {
    return folderId ? findFolderGroup(folderId, folderGroup) : folderGroup;
  }, [folderGroup, folderId]);

  const handleInsetFolder = useCallback((id: string) => {
    folderId && preFolderId.current.push(folderId);
    setFolderId(id);
  }, []);

  const handleBack = useCallback(() => {
    const pre = preFolderId.current.pop();
    setFolderId(pre);
  }, []);

  const renderItem = (item: FolderGroup) => {
    if (item.isFolder)
      return <FolderItem key={item.id} id={item.id} onTitleClick={handleInsetFolder} />;

    return <FileItem key={item.id} id={item.id} onClick={onEditor} />;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Input placeholder="搜索笔记" prefix={<IconSearch />} className={styles.round} />
        <ListOrder />
      </div>
      {folderId && <BackHead id={folderId} onBack={handleBack} />}
      <List
        className={styles.list}
        hoverable
        bordered={false}
        render={renderItem}
        dataSource={group}
      />
    </div>
  );
};

export default ListSlider;
