import { clipboard, Notification } from 'electron';
import { noop } from 'lodash-es';

interface IShowNotificationOption {
  title: string;
  body: string;
  // icon?: string | import('electron').NativeImage
}

interface IPrivateShowNotificationOption extends IShowNotificationOption {
  /**
   * click notification to copy the body
   */
  clickToCopy?: boolean;
  copyContent?: string; // something to copy
  clickFn?: () => void;
}

/**
 * show notification
 * @param options
 */
export const showNotification = (
  options: IPrivateShowNotificationOption = {
    title: '',
    body: '',
    clickToCopy: false,
    copyContent: '',
    clickFn: noop,
  },
) => {
  const notification = new Notification({
    title: options.title,
    body: options.body,
    // icon: options.icon || undefined
  });
  const handleClick = () => {
    if (options.clickToCopy) {
      clipboard.writeText(options.copyContent || options.body);
    }
    if (options.clickFn) {
      options.clickFn();
    }
  };
  notification.once('click', handleClick);
  notification.once('close', () => {
    notification.removeListener('click', handleClick);
  });
  notification.show();
};
