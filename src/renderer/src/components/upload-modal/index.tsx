import { Button, Modal, Radio, Space, Typography, Upload } from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';

import { AppEventManager, EventType } from '@/event';

const UploadModal: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleOpen = () => setVisible(true);

    AppEventManager.on(EventType.OPEN_UPLOAD_MODAL, handleOpen);

    return () => {
      AppEventManager.removeListener(EventType.OPEN_UPLOAD_MODAL, handleOpen);
    };
  }, []);

  return (
    <Modal
      visible={visible}
      title="上传附件"
      onCancel={() => setVisible(false)}
      footer={null}
    >
      <Space direction="vertical" className="w-full">
        <Space size="mini">
          <Typography.Text>选择存储策略：</Typography.Text>
          <Radio.Group>
            <Radio value="local">
              {({ checked }) => (
                <Button type={checked ? 'primary' : 'outline'}>本地存储</Button>
              )}
            </Radio>
          </Radio.Group>
        </Space>
        <Upload drag multiple accept="image/*" tip="Only pictures can be uploaded" />
      </Space>
    </Modal>
  );
};

export default UploadModal;
