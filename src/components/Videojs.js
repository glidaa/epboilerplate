import React, { useEffect, useRef } from 'react'
import VideoJs from 'video.js'


const videoJsOptions = {
  controls: false,
  autoplay: true,
  fluid: false,
  loop: true,
  width: '100%',
  aspectRatio: '16:9'
}

const VideoPlayer = ({ url, display }) => {
  const videoContainer = useRef()

  //  Setup the player
  useEffect(() => {
    //  Setting content like this because player.dispose() remove also the html contentif
    if(videoContainer?.current){

        videoContainer.current.innerHTML = `
        <div data-vjs-player>
        <video class="video-js" />
        </div>
        `
        const player = VideoJs(videoContainer.current.querySelector('video'), videoJsOptions, async () => {
            player.src({ src: 'https://e20604ef07e8336ff0929ea8d86cd342.egress.mediapackage-vod.us-east-1.amazonaws.com/out/v1/355b7150bcf14b9983768d087dfd291c/31cd178ecba441c9b76145a0305fd05c/8d904062595a47f09f4cec8d4e4009b6/index.m3u8'/*url/*, type: fileType */})
    })
    
    //  When destruct dispose the player
    return () => player.dispose()
}
  }, [display])

  return (
    <div
    className="left-side video"
    style={{
      display: display /*|| !display & !load */? 'flex' : 'none',
    }}
  >
    <div className="video__div">
      {display?<div style={{ width: '100%', height: '100%', display:'flex', alignItems:'center'}} ref={videoContainer}/>:null}
      </div>
      </div>
  )
}

export default VideoPlayer
