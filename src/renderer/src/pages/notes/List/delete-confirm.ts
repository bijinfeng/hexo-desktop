import { Modal } from '@arco-design/web-react';

export const deleteConfirm = (onOk: () => void) => () =>
  Modal.confirm({
    title: '确定删除',
    content: '删除内容将进入回收站，1年后自动彻底删除。',
    okButtonProps: {
      type: 'primary',
    },
    onOk,
  });
