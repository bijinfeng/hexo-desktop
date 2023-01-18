import { Form, Input, Modal } from '@arco-design/web-react';
import React, { useCallback, useMemo, useState } from 'react';
import { RiImageAddLine, RiImageLine } from 'react-icons/ri';

import ActionDropdown, { ActionItem } from '@/components/action-dropdown';
import { AppEventManager, EventType } from '@/event';

import { useMarkdownContext } from '../context';

const CreateImageButton: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { editor } = useMarkdownContext();
  const [form] = Form.useForm();

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const handleOk = useCallback(() => {
    form.validate((errors, values) => {
      if (!errors) {
        editor.commands.setImage(values);
        handleClose();
      }
    });
  }, []);

  const handleUpload = useCallback(() => {
    AppEventManager.emit(
      EventType.OPEN_UPLOAD_MODAL,
      { accept: 'image/*' },
      (attachments: PICGO.IPicAttachment[]) => {
        attachments.forEach((attachment) => {
          attachment.imgUrl &&
            editor.commands.setImage({
              src: attachment.imgUrl,
              title: attachment.fileName,
            });
        });
      },
    );
  }, []);

  const actions = useMemo<ActionItem[]>(() => {
    return [
      {
        key: 'network',
        icon: <RiImageLine />,
        title: '网络图片',
        onClick: () => setVisible(true),
      },
      {
        key: 'upload',
        icon: <RiImageAddLine />,
        title: '上传图片',
        onClick: handleUpload,
      },
    ];
  }, []);

  return (
    <>
      <ActionDropdown actions={actions}>
        <RiImageLine />
      </ActionDropdown>
      <Modal
        visible={visible}
        title="网路图片"
        onCancel={handleClose}
        onOk={handleOk}
        afterClose={() => form.resetFields()}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="图片地址" field="src" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="图片标题" field="title">
            <Input />
          </Form.Item>
          <Form.Item label="备选标题" field="alt">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateImageButton;
