const  { app, BrowserWindow } = require('electron');
const nativeImage = require('electron').nativeImage;

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800, 
    webPreferences: {
      nodeIntegration: true, 
      worldSafeExecuteJavaScript: true
    },
    icon: __dirname + '/png/TimeKeeper-sm.png'
  });

  win.loadFile('index.html')
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if(BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});