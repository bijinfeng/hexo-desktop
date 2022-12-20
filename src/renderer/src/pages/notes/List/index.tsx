import { Button, Input, List, Typography } from '@arco-design/web-react';
import { IconSearch } from '@arco-design/web-react/icon';
import React, { useCallback, useMemo } from 'react';

import { ReactComponent as NoContentIllu } from '@/assets/icons/no-content-illu.svg';
import ListOrder from '@/components/list-order';
import type { FolderGroup } from '@/interface';
import { useModelStore } from '@/models/post';

import styles from '../styles.module.less';
import BackHead from './back-head';
import FileItem from './file-item';
import FolderItem from './folder-item';
import RightMenu from './right-menu';

const ListSlider: React.FC = () => {
  const {
    findFolderGroup,
    findParentFolder,
    createPost,
    folderId,
    setFolderId,
    setPostId,
  } = useModelStore();

  const group = useMemo(() => findFolderGroup(folderId), [folderId]);

  const handleBack = useCallback((id: string) => {
    const parentFolder = findParentFolder(id);
    setFolderId(parentFolder);
  }, []);

  const renderItem = (item: FolderGroup) => {
    if (item.isFolder)
      return <FolderItem key={item.id} id={item.id} onTitleClick={setFolderId} />;

    return <FileItem key={item.id} id={item.id} onClick={setPostId} />;
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
        <div className="flex-1 overflow-hidden">
          <List
            wrapperClassName="h-full"
            className="h-full px-3"
            hoverable
            bordered={false}
            render={renderItem}
            noDataElement={renderNoDataElement()}
            dataSource={group}
          />
        </div>
      </RightMenu>
      <div className="flex items-center px-3 border-t border-border h-7">
        <Typography.Text className="text-xs" type="secondary">
          总共{group.length}项
        </Typography.Text>
      </div>
    </div>
  );
};

export default ListSlider;
