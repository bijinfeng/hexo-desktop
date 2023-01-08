import { Alert, Modal, Typography, Upload } from '@arco-design/web-react';
import { UploadItem } from '@arco-design/web-react/es/Upload';
import { isArray, isEmpty, isError } from 'lodash-es';
import React, { useEffect, useMemo, useState } from 'react';

import { AppEventManager, EventType } from '@/event';
import { usePicgoStore } from '@/models/picgo';

const UploadModal: React.FC = () => {
  const { upload, addAttachment, defaultPicBed, picBeds } = usePicgoStore();
  const [fileList, setFileList] = useState<UploadItem[]>([]);
  const [visible, setVisible] = useState(false);

  const defaultPicBedName = useMemo(
    () => picBeds.find((it) => it.type === defaultPicBed)?.name,
    [defaultPicBed, picBeds],
  );

  useEffect(() => {
    const handleOpen = () => setVisible(true);

    AppEventManager.on(EventType.OPEN_UPLOAD_MODAL, handleOpen);

    return () => {
      AppEventManager.removeListener(EventType.OPEN_UPLOAD_MODAL, handleOpen);
    };
  }, []);

  const handleOk = () => {
    const attachments = fileList.reduce((result: PICGO.IPicAttachment[], item) => {
      if (isArray(item.response) && !isEmpty(item.response)) {
        return [...result, ...item.response];
      }
      return result;
    }, []);

    addAttachment(attachments);
    setVisible(false);
  };

  const renderAlertContent = () => (
    <Typography.Text>
      上传至{defaultPicBedName}图床，可以到「
      <Typography.Text type="primary" className="cursor-pointer">
        设置-附件管理
      </Typography.Text>
      」中修改默认图床
    </Typography.Text>
  );

  return (
    <Modal
      visible={visible}
      title={<div className="text-left">上传附件</div>}
      onCancel={() => setVisible(false)}
      onOk={handleOk}
      afterClose={() => setFileList([])}
      className="modal-clear-padding"
    >
      <Alert content={renderAlertContent()} />
      <div className="px-5 py-6">
        <Upload
          drag
          multiple
          accept="image/*"
          fileList={fileList}
          onChange={setFileList}
          customRequest={(option) => {
            const { onProgress, onError, onSuccess, file } = option;
            upload(file, onProgress).then((res) => {
              isError(res) ? onError(res) : onSuccess(res);
            });
          }}
        />
      </div>
    </Modal>
  );
};

export default UploadModal;
