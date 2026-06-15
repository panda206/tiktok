import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { start } from './core/tiktok';

let mainWindow: BrowserWindow;
console.log(Buffer.from('🚪', 'utf8'));
console.log('🚪');
function createWindow() {
    console.log('🟢 [MAIN] 创建窗口');
    mainWindow = new BrowserWindow({

        width: 800,
        height: 600,

        webPreferences: {

            preload: path.join(
                __dirname,
                'preload.js'
            ),

            contextIsolation: true,
            nodeIntegration: false,
            devTools: false   // ⭐ 加这一行
        }
    });

    mainWindow.loadFile(
        path.join(
            __dirname,
            'renderer/index.html'
        )
    );

    console.log('🟢 [MAIN] 窗口已加载 renderer');
}

app.whenReady().then(() => {

    createWindow();

    ipcMain.handle('connect-tiktok', async (_, username: string) => {
        console.log('🟡 [MAIN] 收到 IPC connect-tiktok:', username);
        try {
            await start(username);
            console.log('🟢 [MAIN] start() 执行完成');
            return true;

        } catch (err) {
            console.log('🔴 [MAIN] start() 报错:', err);
            return false;
        }
    }
    );
});