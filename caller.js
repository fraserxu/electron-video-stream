var swarm = require('webrtc-swarm')
var signalhub = require('signalhub')

var hub = signalhub('electron-video-stream', ['https://signalhub.herokuapp.com/'])

var sw = swarm(hub)

var video = document.querySelector('video')

sw.on('peer', function (peer, id) {
  console.log('connected to a new peer:', id, peer)
  console.log('total peers:', sw.peers.length)

  peer.on('stream', function (stream) {
    console.log('on stream', stream)
    // got remote video stream, now let's show it in a video tag
    // var video = document.querySelector('video')
    // video.src = window.URL.createObjectURL(stream)
    // video.play()
  })
})

sw.on('disconnect', function (peer, id) {
  console.log('disconnected from a peer:', id)
  console.log('total peers:', sw.peers.length)
})

// sw.on('connection', function (conn) {
//   console.log('On connection', conn)
// })

// sw.on('open', function (id) {
//   console.log('My ID ', id)

//   var peerId = window.location.search.replace('?', '') || 'electron-video'
//   console.log('peerID', peerId)
//   var conn = peer.connect(peerId)
// })

// sw.on('call', function (call) {
//   console.log('on call', call)

//   call.answer()

//   call.on('stream', function (stream) {
//     video.src = URL.createObjectURL(stream)
//   })

// })
