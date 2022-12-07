import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  send: (channel: string, data: any) => {
    const validChannels = ['fromRenderer'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  invoke: (channel: string, data: any): Promise<any> => {
    const validChannels = ['fromRenderer'];
    if (validChannels.includes(channel)) {
      return ipcRenderer.invoke(channel, data);
    }
    return Promise.resolve();
  },
  receive: (channel: string, func: (args: any) => void) => {
    const validChannels = ['fromMain'];
    if (validChannels.includes(channel)) {
      ipcRenderer.removeAllListeners(channel);
      // Deliberately strip event as it includes `sender`
      ipcRenderer.addListener(channel, (_event, args) => func(args));
    }
  },
});

contextBridge.exposeInMainWorld('windowEvent', {
  set: (eventName: string) => {
    ipcRenderer.send('windowEvent', eventName);
  },
  get: (eventName: string) => {
    return ipcRenderer.invoke('windowEvent', eventName);
  },
});
