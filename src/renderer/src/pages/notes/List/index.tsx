import { Button, Input, List } from '@arco-design/web-react';
import { IconSearch } from '@arco-design/web-react/icon';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import { ReactComponent as NoContentIllu } from '@/assets/icons/no-content-illu.svg';
import ListOrder from '@/components/list-order';
import type { FolderGroup } from '@/interface';
import { useModelStore } from '@/models/post';

import styles from '../styles.module.less';
import BackHead from './back-head';
import FileItem from './file-item';
import FolderItem from './folder-item';
import RightMenu from './right-menu';

interface ListSliderProps {
  onEditor: (id: string) => void;
}

const ListSlider: React.FC<ListSliderProps> = ({ onEditor }) => {
  const preFolderId = useRef<string[]>([]);
  const [folderId, setFolderId] = useState<string>();
  const { findFolderGroup, createPost } = useModelStore();

  const group = useMemo(() => findFolderGroup(folderId), [folderId]);

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

  const renderNoDataElement = () => {
    return (
      <div className="flex flex-col w-full h-full items-center justify-center text-[140px]">
        <NoContentIllu className="opacity-40" />
        <Button type="primary" onClick={() => createPost(folderId)}>
          新建笔记
        </Button>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Input placeholder="搜索笔记" prefix={<IconSearch />} className={styles.round} />
        <ListOrder />
      </div>
      {folderId && <BackHead id={folderId} onBack={handleBack} />}
      <RightMenu folderId={folderId}>
        <div className={styles.list}>
          <List
            wrapperClassName="h-full"
            className="h-full"
            hoverable
            bordered={false}
            render={renderItem}
            noDataElement={renderNoDataElement()}
            dataSource={group}
          />
        </div>
      </RightMenu>
    </div>
  );
};

export default ListSlider;
