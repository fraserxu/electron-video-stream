var swarm = require('webrtc-swarm')
var signalhub = require('signalhub')

var ipcRenderer = require('electron').ipcRenderer
var hub = signalhub('electron-video-stream', ['https://signalhub.herokuapp.com/'])

var sw = swarm(hub)
var video = document.querySelector('video')

ipcRenderer.send('asynchronous-message', 'ping')
ipcRenderer.on('asynchronous-reply', function (arg) {

  console.log('on reply...')

  sw.on('peer', function (peer, id) {
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
          peer._pc.addStream(stream)
          console.log('stream', stream)
        },
        error
      )
    })
    console.log('connected to a new peer:', id, peer)
    console.log('total peers:', sw.peers.length)
  })

  sw.on('disconnect', function (peer, id) {
    console.log('disconnected from a peer:', id)
    console.log('total peers:', sw.peers.length)
  })

  function error (err) {
    if (err) throw err
  }
})
