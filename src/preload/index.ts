import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  send: (channel: string, data: any) => {
    // whitelist channels
    const validChannels = ['fromRenderer'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send('fromRenderer', data);
    }
  },
  receive: (channel: string, func: (args: any) => void) => {
    const validChannels = ['fromMain'];
    if (validChannels.includes(channel)) {
      ipcRenderer.removeAllListeners(channel);
      // Deliberately strip event as it includes `sender`
      ipcRenderer.addListener(channel, (_event, args) => {
        console.log(channel, args);
        func(args);
      });
    }
  },
});
