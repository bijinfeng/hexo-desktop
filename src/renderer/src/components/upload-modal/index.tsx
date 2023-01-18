import { Alert, Modal, Typography, Upload } from '@arco-design/web-react';
import { UploadItem } from '@arco-design/web-react/es/Upload';
import { isArray, isEmpty, isError } from 'lodash-es';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { AppEventManager, EventType } from '@/event';
import { usePicgoStore } from '@/models/picgo';

export interface UploadProps {
  multiple?: boolean;
  accept?: string;
}

export type UploadCallback = (attachments: PICGO.IPicAttachment[]) => void;

const defaultUploadProps: UploadProps = { multiple: true };

const UploadModal: React.FC = () => {
  const { upload, addAttachment, defaultPicBed, picBeds } = usePicgoStore();
  const [uploadProps, setUploadProps] = useState(defaultUploadProps);
  const [fileList, setFileList] = useState<UploadItem[]>([]);
  const [visible, setVisible] = useState(false);
  const callbackFunc = useRef<UploadCallback>();

  const defaultPicBedName = useMemo(
    () => picBeds.find((it) => it.type === defaultPicBed)?.name,
    [defaultPicBed, picBeds],
  );

  useEffect(() => {
    const handleOpen = (params: UploadProps = {}, callback?: UploadCallback) => {
      setUploadProps((pre) => ({ ...pre, ...params }));
      callbackFunc.current = callback;
      setVisible(true);
    };

    AppEventManager.on(EventType.OPEN_UPLOAD_MODAL, handleOpen);

    return () => {
      AppEventManager.removeListener(EventType.OPEN_UPLOAD_MODAL, handleOpen);
    };
  }, []);

  const openSetting = () => {
    AppEventManager.emit(EventType.OPEN_SETTING, 'attachment');
  };

  const handleOk = () => {
    const attachments = fileList.reduce((result: PICGO.IPicAttachment[], item) => {
      if (isArray(item.response) && !isEmpty(item.response)) {
        return [...result, ...item.response];
      }
      return result;
    }, []);

    addAttachment(attachments);
    callbackFunc.current?.(attachments);
    setVisible(false);
  };

  const renderAlertContent = () => (
    <Typography.Text>
      上传至{defaultPicBedName}图床，可以到「
      <Typography.Text type="primary" className="cursor-pointer" onClick={openSetting}>
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
      mountOnEnter={false}
    >
      <Alert content={renderAlertContent()} />
      <div className="px-5 py-6">
        <Upload
          {...uploadProps}
          drag
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
