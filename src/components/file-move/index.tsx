import { Modal } from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';

import { AppEventManager, EventType } from '@/event';

const FileMove: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleOpen = () => setVisible(true);

    AppEventManager.subscribe(EventType.OPEN_FILE_MOVE_MODAL, handleOpen);

    return () => {
      AppEventManager.unsubscribe(EventType.OPEN_FILE_MOVE_MODAL, handleOpen);
    };
  }, []);

  const onOk = () => {
    setVisible(false);
  };

  return (
    <Modal
      title="移动到"
      visible={visible}
      onOk={onOk}
      onCancel={() => setVisible(false)}
    >
      <div />
    </Modal>
  );
};

export const fileMove = () => {
  AppEventManager.publish(EventType.OPEN_FILE_MOVE_MODAL);
};

export default FileMove;
