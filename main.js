var video = document.querySelector('#vid')

MediaStreamTrack.getSources(function(sources) {
  console.log(sources)

  var videoSources = sources.filter(function(source) {
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

      video.src = URL.createObjectURL(stream)
    },
    function () {

    })
})
