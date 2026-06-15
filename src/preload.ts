import { contextBridge, ipcRenderer } from 'electron';

console.log('🟣 [PRELOAD] 已加载');

contextBridge.exposeInMainWorld('api', {

    connect: (username: string) => {
        console.log('🟣 [PRELOAD] connect 被调用:', username);

        return ipcRenderer.invoke('connect-tiktok', username);
    }
});