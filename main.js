var cuid = require('cuid')
var signalhub = require('signalhub')
var SimplePeer = require('simple-peer')

var hub = signalhub('electron-video-stream', ['https://signalhub.herokuapp.com/'])
var me = cuid()
var stream
var peer0

var video = document.querySelector('video')

// listen on join event
hub.subscribe('/electron-video-stream-channel')
  .on('data', function (message) {
    console.log('new message received', message)
    if (message.type === 'join') {
      joinHandler(message)
    }
  })

function joinHandler (message) {
  console.log('on join', message)
  createPeer0(function (err, peer0) {
    peer0.on('signal', function (data) {
      hub.broadcast('/electron-video-stream-channel', {
        type: 'signal',
        from: me,
        data: data
      })
    })
  })
}

function getStream (cb) {
  if (stream) {
    cb(null, stream)
  } else {
    MediaStreamTrack.getSources(function (sources) {
      var videoSources = sources.filter(function (source) {
        source.kind === 'video'
      })

      navigator.webkitGetUserMedia({
        audio: true,
        video: {
          optional: [
            { sourceId: videoSources[0] }
          ]
        }},
        function (stream) {
          // video.src = window.URL.createObjectURL(stream)
          // video.play()
          stream = stream
          cb(null, stream)
        },
        function (err) {
          cb(err)
        }
      )
    })
  }
}

function createPeer0 (cb) {
  if (peer0) {
    cb(null, peer0)
  } else {
    getStream(function (err, stream) {
      if (err) {
        cb(err)
      }
      peer0 = new SimplePeer({
        initiator: true,
        trickle: false,
        stream: stream
      })
      cb(null, peer0)
    })
  }
}
