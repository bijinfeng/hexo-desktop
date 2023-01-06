import { Button, Card, Image, Space } from '@arco-design/web-react';
import { IconStorage, IconUpload } from '@arco-design/web-react/icon';
import React, { useCallback, useRef, useState } from 'react';

import { AppEventManager, EventType } from '@/event';

import CardList from './card';
import { AttachmentProvider } from './context';
import Header from './header';
import TableList from './table';
import Toolbar from './toolbar';

const Attachment: React.FC = () => {
  const [isList, setIsList] = useState<boolean>(true);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleOpen = useCallback(() => {
    AppEventManager.emit(EventType.OPEN_UPLOAD_MODAL);
  }, []);

  const TopExtra = (
    <Space>
      <Button icon={<IconStorage />} size="small">
        存储策略
      </Button>
      <Button icon={<IconUpload />} type="primary" size="small" onClick={handleOpen}>
        上传
      </Button>
    </Space>
  );

  return (
    <AttachmentProvider>
      <Card
        ref={wrapperRef}
        title="附件管理"
        bordered={false}
        extra={TopExtra}
        className="flex flex-col relative h-full !bg-transparent"
        bodyStyle={{ flex: 1 }}
      >
        <Header isList={isList} setIsList={setIsList} />
        <Image.PreviewGroup infinite getPopupContainer={() => wrapperRef.current!}>
          {isList ? <TableList /> : <CardList />}
        </Image.PreviewGroup>
        <Toolbar />
      </Card>
    </AttachmentProvider>
  );
};

export default Attachment;
