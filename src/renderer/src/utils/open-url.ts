import { sendCommand } from '@/commands';

export const openUrl = (url: string) => {
  sendCommand('openUrl', { url });
};
