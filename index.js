var express = require('express')
var app = require('app')
var fs = require('fs')
var path = require('path')
var BrowserWindow = require('browser-window')

var App = express()
App.use(express.static('.'))

var server = App.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Server listening at http://%s:%s', host, port);
})

app.on('ready', appReady)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function appReady () {
  var win = new BrowserWindow({ width: 0, height: 0, show: false })
  win.on('closed', function () { win = null })
  win.loadUrl('file://' + __dirname + '/main.html')
}
