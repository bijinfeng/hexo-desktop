import { Button, Card, Space } from '@arco-design/web-react';
import { IconStorage, IconUpload } from '@arco-design/web-react/icon';
import React from 'react';

import ImageList from '@/components/image-list';

import styles from './style.module.less';

const Attachment: React.FC = () => {
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
      <ImageList />
    </Card>
  );
};

export default Attachment;
