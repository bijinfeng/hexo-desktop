import { Modal, Upload } from '@arco-design/web-react';
import { UploadItem } from '@arco-design/web-react/es/Upload';
import { isArray, isEmpty, isError } from 'lodash-es';
import React, { useEffect, useState } from 'react';

import { AppEventManager, EventType } from '@/event';
import { usePicgoStore } from '@/models/picgo';

const UploadModal: React.FC = () => {
  const { upload, addAttachment } = usePicgoStore();
  const [fileList, setFileList] = useState<UploadItem[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleOpen = () => setVisible(true);

    AppEventManager.on(EventType.OPEN_UPLOAD_MODAL, handleOpen);

    return () => {
      AppEventManager.removeListener(EventType.OPEN_UPLOAD_MODAL, handleOpen);
    };
  }, []);

  const handleOk = () => {
    const attachments = fileList.reduce((result: PICGO.IImgInfo[], item) => {
      if (isArray(item.response) && !isEmpty(item.response)) {
        return [...result, ...item.response];
      }
      return result;
    }, []);

    addAttachment(attachments);
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      title="上传附件"
      onCancel={() => setVisible(false)}
      onOk={handleOk}
      afterClose={() => setFileList([])}
    >
      <Upload
        drag
        multiple
        accept="image/*"
        tip="Only pictures can be uploaded"
        fileList={fileList}
        onChange={setFileList}
        customRequest={(option) => {
          const { onProgress, onError, onSuccess, file } = option;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          upload([file.path], onProgress).then((res) => {
            isError(res) ? onError(res) : onSuccess(res);
          });
        }}
      />
    </Modal>
  );
};

export default UploadModal;
