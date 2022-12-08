import { Button, Card, Space } from '@arco-design/web-react';
import { IconStorage, IconUpload } from '@arco-design/web-react/icon';
import React, { useRef } from 'react';

import ImageList from '@/components/image-list';

import styles from './style.module.less';

const Attachment: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const TopExtra = (
    <Space>
      <Button icon={<IconStorage />} size="small">
        存储策略
      </Button>
      <Button icon={<IconUpload />} type="primary" size="small">
        上传
      </Button>
    </Space>
  );

  return (
    <Card title="附件管理" bordered={false} extra={TopExtra} className={styles.wrapper}>
      <div ref={wrapperRef}>
        <ImageList getPopupContainer={() => wrapperRef.current!} />
      </div>
    </Card>
  );
};

export default Attachment;
