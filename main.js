const  { app, BrowserWindow, ipcMain } = require('electron');
const Store = require('electron-store');

const store = new Store({
  configName: 'user-preferences',
  defaults: {
    'hoursWorked': 0,
    'minutesWorked': 0,
    'secondsWorked': 0
  }
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800, 
    webPreferences: {
      nodeIntegration: true, 
      worldSafeExecuteJavaScript: true
    },
    icon: __dirname + 'png/TimeKeeper-sm.png'
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

const updateStore = newTime => {
  store.set(newTime);
}

ipcMain.on('requestTimeData', (event, timeRequested) => {
  if(store.has(timeRequested)){
    event.reply('returnTimeData', store.get(timeRequested));
  } else {
    console.log('Error: Store does not contain the requeted item');
  }
})
