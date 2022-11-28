import { AppEventManager } from '@/event';

export function invokeCommand(type: string, payload = {}) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.api.send('fromRenderer', {
    type,
    ...payload,
  });
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.api.receive('fromMain', (args) => {
  console.log('fromMain: ', args);
  const { type } = args;
  AppEventManager.emit(type, args);
});
