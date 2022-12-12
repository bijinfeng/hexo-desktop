import { Button, Card, Space } from '@arco-design/web-react';
import { IconStorage, IconUpload } from '@arco-design/web-react/icon';
import React, { useCallback, useRef } from 'react';

import ImageList from '@/components/image-list';
import { AppEventManager, EventType } from '@/event';

const Attachment: React.FC = () => {
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
      title="附件管理"
      bordered={false}
      extra={TopExtra}
      className="relative h-full !bg-transparent"
    >
      <div ref={wrapperRef}>
        <ImageList getPopupContainer={() => wrapperRef.current!} />
      </div>
    </Card>
  );
};

export default Attachment;
