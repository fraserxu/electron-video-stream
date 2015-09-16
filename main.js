var Peer = require('peerjs')
var ipc = require('ipc')

var video = document.querySelector('video')

ipc.send('asynchronous-message', 'ping')
ipc.on('asynchronous-reply', function (arg) {
  var peer = new Peer(arg || 'electron-video', { key: 'ob1bohiqjkedn29' })

  console.log('peer', peer)

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

          console.log('stream', stream)

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
})
