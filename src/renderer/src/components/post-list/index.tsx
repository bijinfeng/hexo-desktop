import { Input, List, Typography } from '@arco-design/web-react';
import { IconSearch } from '@arco-design/web-react/icon';
import React from 'react';

import ContextMenu, { ActionItem } from '@/components/context-menu';
import ListOrder from '@/components/list-order';

type ListProps = React.ComponentProps<typeof List>;

export interface PostListProps
  extends Pick<ListProps, 'dataSource' | 'render' | 'noDataElement'> {
  header?: React.ReactNode;
  rightMenu?: ActionItem[];
}

const PostList: React.FC<PostListProps> = (props) => {
  const { header, dataSource, render, rightMenu, noDataElement } = props;

  const renderNoDataElement = () => (
    <div className="flex flex-col w-full h-full items-center justify-center">
      {noDataElement}
    </div>
  );

  const renderList = () => (
    <div className="flex-1 overflow-hidden">
      <List
        wrapperClassName="h-full"
        className="h-full px-3"
        hoverable
        bordered={false}
        render={render}
        noDataElement={renderNoDataElement()}
        dataSource={dataSource}
      />
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center px-[15px] py-[20px] gap-[8px]">
        <Input
          placeholder="搜索笔记"
          prefix={<IconSearch />}
          className="arco-round-input"
        />
        <ListOrder />
      </div>
      {header}
      {rightMenu && rightMenu.length > 0 ? (
        <ContextMenu actions={rightMenu}>{renderList()}</ContextMenu>
      ) : (
        renderList()
      )}
      <div className="flex items-center px-3 border-t border-border h-7">
        <Typography.Text className="text-xs" type="secondary">
          总共 {dataSource ? dataSource.length : 0} 项
        </Typography.Text>
      </div>
    </div>
  );
};

export default React.memo(PostList);
