import { Breadcrumb, Button, Card } from '@arco-design/web-react';
import { IconPlus, IconRight } from '@arco-design/web-react/icon';
import React, { useCallback, useContext, useState } from 'react';

import { AppEventManager, EventType } from '@/event';

import CardList from './card';
import { AttachmentProvider, AttchmentContext } from './context';
import Header from './header';
import Search from './search';
import TableList from './table';
import Toolbar from './toolbar';

const Title: React.FC = () => {
  const { searchState, onSearch } = useContext(AttchmentContext);
  const hoverClassName = 'hover:text-primary-6 cursor-pointer';

  const handleClick = () => {
    if (!searchState.keyword) return;
    onSearch('');
  };

  return (
    <Breadcrumb separator={<IconRight />}>
      <Breadcrumb.Item className={hoverClassName} onClick={handleClick}>
        附件管理
      </Breadcrumb.Item>
      {searchState.keyword && <Breadcrumb.Item>{searchState.keyword}</Breadcrumb.Item>}
    </Breadcrumb>
  );
};

const Attachment: React.FC = () => {
  const [isList, setIsList] = useState<boolean>(true);

  const handleOpen = useCallback(() => {
    AppEventManager.emit(EventType.OPEN_UPLOAD_MODAL);
  }, []);

  const TopExtra = (
    <div className="flex items-center">
      <Search />
      <Button
        className="ml-6"
        size="small"
        shape="circle"
        type="primary"
        icon={<IconPlus />}
        onClick={handleOpen}
      />
    </div>
  );

  return (
    <AttachmentProvider>
      <Card
        title={<Title />}
        bordered={false}
        extra={TopExtra}
        className="flex flex-col relative h-full !bg-transparent"
        bodyStyle={{ flex: 1 }}
      >
        <Header isList={isList} setIsList={setIsList} />
        {isList ? <TableList /> : <CardList />}
        <Toolbar />
      </Card>
    </AttachmentProvider>
  );
};

export default Attachment;
