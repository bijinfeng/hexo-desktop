import { AppEventManager } from '@/event';

/**
 * 发送消息到主进程
 * @param type
 * @param payload
 */
export function sendCommand(type: string, payload = {}) {
  window.api.send('fromRenderer', {
    type,
    ...payload,
  });
}

/**
 * 和主进程的双向通信
 * @param type
 * @param payload
 * @returns
 */
export const invokeCommand = <T>(type: string, payload = {}) => {
  return window.api.invoke<T>('fromRenderer', {
    type,
    ...payload,
  });
};

/**
 * 监听主进程的消息
 */
window.api.receive('fromMain', (args) => {
  const { type } = args;
  AppEventManager.emit(type, args);
});
