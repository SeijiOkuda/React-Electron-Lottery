import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';

// __dirnameの代わりにimport.meta.urlを使用してパスを取得
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    // 開発環境
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    // 本番環境
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
