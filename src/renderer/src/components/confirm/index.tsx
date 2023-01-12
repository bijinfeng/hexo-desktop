import { Button, Modal, Typography } from '@arco-design/web-react';
import { IconExclamationCircleFill } from '@arco-design/web-react/icon';
import cls from 'classnames';

export const confirm = (props: Parameters<typeof Modal.confirm>[0]) => {
  const {
    title,
    content,
    icon,
    onCancel,
    onOk,
    okButtonProps,
    cancelButtonProps,
    wrapClassName,
    wrapStyle,
    ...rest
  } = props;

  const getIcon = () => {
    if (icon) return icon;

    return (
      <IconExclamationCircleFill
        fontSize={18}
        style={{ color: 'rgb(var(--warning-6))' }}
      />
    );
  };

  const handleCancel = () => {
    dialog.close();
    onCancel?.();
  };

  const handleOk = () => {
    dialog.close();
    onOk?.();
  };

  const dialog = Modal.confirm({
    ...rest,
    modalRender: () => (
      <div className={cls('arco-modal !w-[416px]', wrapClassName)} style={wrapStyle}>
        <div className="px-6 py-5">
          <div className="flex">
            <div className="h-6 mr-3 flex items-center">{getIcon()}</div>
            <div className="flex-1">
              <Typography.Text className="text-base font-semibold !leading-6">
                {title}
              </Typography.Text>
              <div className="mt-2">
                <Typography.Text className="leading-6">{content}</Typography.Text>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button onClick={handleCancel} {...cancelButtonProps}>
              取消
            </Button>
            <Button type="primary" onClick={handleOk} {...okButtonProps}>
              确定
            </Button>
          </div>
        </div>
      </div>
    ),
  });

  return dialog;
};
