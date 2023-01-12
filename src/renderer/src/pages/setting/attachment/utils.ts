import { invokeCommand } from '@/commands';

// 安装插件
export const installPlugin = (name: string) => {
  return invokeCommand('picInstallPic', { name });
};
