var app = require('app')
var fs = require('fs')
var path = require('path')
var BrowserWindow = require('browser-window')

app.on('ready', appReady)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function appReady () {
  var win = new BrowserWindow({ width: '1000px', height: '800px', show: true })
  win.on('closed', function () { win = null })
  win.loadUrl('file://' + __dirname + '/main.html')
}
