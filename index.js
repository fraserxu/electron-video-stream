'use strict'

const argv = require('minimist')(process.argv.slice(2))
const fs = require('fs')
const path = require('path')
const electron = require('electron')

const app = electron.app
const ipcMain = electron.ipcMain
const BrowserWindow = electron.BrowserWindow
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 600, height: 600})
  // mainWindow = new BrowserWindow({width: 600, height: 600, show: false, frame: false})

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/main.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// send the camera peer ID to the rendering process
ipcMain.on('asynchronous-message', function (event, arg) {
  let input = argv._[0] || argv.i || argv.input

  console.log('Camera peer ID: ', input)

  event.sender.send('asynchronous-reply', input)
})
