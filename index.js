var app = require('app')
var meow = require('meow')
var fs = require('fs')
var path = require('path')
var BrowserWindow = require('browser-window')

app.on('ready', appReady)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

var cli = meow({
  pkg: './package.json',
  help: [
    'Options',
    '  --help                     Show this help',
    '  --version                  Current version of package',
    '  -i | --input               String - The peer ID of your camera',

    ''
  ].join('\n')
})

// send the camera peer ID to the rendering process
var ipc = require('ipc')
ipc.on('asynchronous-message', function (event, arg) {
  var input = cli.input[0] || cli.flags.i || cli.flags.input

  console.log('Camera peer ID: ', input)

  event.sender.send('asynchronous-reply', input)
})

function appReady () {
  var win = new BrowserWindow({ width: '900px', height: '700px', show: true })

  // var win = new BrowserWindow({ width: 0, height: 0, show: false, frame: false })
  win.on('closed', function () { win = null })
  win.loadUrl('file://' + __dirname + '/main.html')
}
