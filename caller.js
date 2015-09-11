var Peer = require('peerjs')

var peer = new Peer({ key: 'ob1bohiqjkedn29' })
var video = document.querySelector('video')

peer.on('connection', function (conn) {
  console.log('On connection', conn)
})

peer.on('open', function (id) {
  console.log('My ID ', id)

  var conn = peer.connect('wcl-pi')
})

peer.on('call', function (call) {
  console.log('on call', call)

  call.answer()

  call.on('stream', function (stream) {
    video.src = URL.createObjectURL(stream)
  })

})
