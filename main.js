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

ipcMain.handle('requestTimeData', async (event, timeRequested) => {
  if(timeRequested === 'timeData'){
    const result = await store.store;
    return result;
  } else {
    console.log('Error: Request was not valid. Can only return timeData object.');
  }
});

ipcMain.handle('updateTimeData', async (event, infoToUpdate, newTime) => {
  if(infoToUpdate === 'all') {
    for(let time in newTime){
      let oldTime = store.get(time);
      store.set(time, (newTime[time] + oldTime)); 
    }
  }
});

ipcMain.handle('replaceTimeData', async (event, newTime) => {
  store.set(newTime);
});
