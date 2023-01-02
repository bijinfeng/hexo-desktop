import { Button, Card, Space } from '@arco-design/web-react';
import { IconStorage, IconUpload } from '@arco-design/web-react/icon';
import React, { useCallback, useRef } from 'react';

import ImageList from '@/components/image-list';
import { AppEventManager, EventType } from '@/event';
import { usePicgoStore } from '@/models/picgo';

const Attachment: React.FC = () => {
  const attachments = usePicgoStore((state) => state.attachments);
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
    <Card
      ref={wrapperRef}
      title="附件管理"
      bordered={false}
      extra={TopExtra}
      className="flex flex-col relative h-full !bg-transparent"
      bodyStyle={{ flex: 1 }}
    >
      <ImageList data={attachments} getPopupContainer={() => wrapperRef.current!} />
    </Card>
  );
};

export default Attachment;
