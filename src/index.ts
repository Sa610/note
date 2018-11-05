import { app, BrowserWindow, ipcMain, IpcMessageEvent, globalShortcut } from 'electron';

const path  = require('path');
const url   = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: any;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({ width: 950, height: 500, frame: false, resizable: false });

    // and load the index.html of the app.
    win.loadURL('http://localhost:4200');

    // Open the DevTools.
    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });

    globalShortcut.register('CommandOrControl+Z', () => {
        console.log('CommandOrControl+Z is pressed');
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('ping', (event: IpcMessageEvent) => {
    event.sender.send('pong');
});
