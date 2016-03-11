var cuid = require('cuid')
var signalhub = require('signalhub')
var SimplePeer = require('simple-peer')

var hub = signalhub('electron-video-stream', ['https://signalhub.herokuapp.com/'])
var me = cuid()

var peer0 = new SimplePeer()
var video = document.querySelector('video')

hub.subscribe('/electron-video-stream-channel')
  .on('data', function (message) {
    console.log('new message received', message)
    if (message.type === 'join') return
    if (message.type === 'signal') {
      peer0.signal(message.data)
    }
  })

// join
hub.broadcast('/electron-video-stream-channel', {
  type: 'join',
  from: me
})

peer0.on('singal', function (data) {
  console.log('on signal', data)
})

peer0.on('stream', function (stream) {
  console.log('on stream', stream)
  // got remote video stream, now let's show it in a video tag
  // var video = document.querySelector('video')
  video.src = window.URL.createObjectURL(stream)
  video.play()
})
