const  { app, BrowserWindow } = require('electron');
const nativeImage = require('electron').nativeImage;
let image = nativeImage.createFromPath(__dirname + './png/TimeTracker.png')

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800, 
    webPreferences: {
      nodeIntegration: true, 
      worldSafeExecuteJavaScript: true
    },
    icon: image
  });

  win.loadFile('index.html')
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if(process.platform !== 'win32') {
    app.quit();
  }
});

app.on('activate', () => {
  if(BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});