var Peer = require('peerjs')

var video = document.querySelector('video')
var peer = new Peer('wcl-pi', { key: 'ob1bohiqjkedn29' })

peer.on('connection', function (conn) {
  console.log('On connection', conn)

  MediaStreamTrack.getSources(function (sources) {
    console.log(sources)

    var videoSources = sources.filter(function (source) {
      source.kind === 'video'
    })

    navigator.webkitGetUserMedia({
      video: {
        optional: [
          { sourceId: videoSources[0] }
        ]
      }},
      function (stream) {

        // console.log('stream', URL.createObjectURL(stream))

        // video.src = URL.createObjectURL(stream)

        var call = peer.call(conn.peer, stream)

        call.on('stream', function (stream) {
          console.log('on call stream', stream)
        })

      },
      error
    )
  })

  function error (err) {
    if (err) throw err
  }
})

peer.on('call', function (call) {
  console.log('on call', call)


})

peer.on('open', function (id) {
  console.log('My ID ', id)
})


