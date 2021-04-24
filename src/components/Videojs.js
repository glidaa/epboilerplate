import 'video.js/dist/video-js.css';
import '../assets/styles/components/Video.css'

import React, { useEffect, useRef } from 'react'
import VideoJs from 'video.js'

const videoJsOptions = {
  // techOrder: ['html5', 'flash'],
  controls: false,
  autoplay: true,
  fluid: false,
  loop: true,
  height: '100%',
  muted: true
}

const VideoPlayer = ({ src, display, width }) => {
  const videoContainer = useRef()
  //console.log(src)
  //  Setup the player
  useEffect(() => {
    //  Setting content like this because player.dispose() remove also the html contentif
    //console.log(videoContainer)
    if(videoContainer?.current){

        videoContainer.current.innerHTML = `
        <div data-vjs-player>
        <video class="video-js" />
        </div>
        `
        

        const player = VideoJs(videoContainer.current.querySelector('video'), videoJsOptions, async () => {
            player.src({ src: src})
    })
    
    //  When destruct dispose the player
    return () => player.dispose()
}
  }, [display,src])

  return (
    <div
    className="left-side video"
    style={{
      display: display /*|| !display & !load */? 'flex' : 'none',
    }}
  >
    <div className="video__div" style={{width:`${width}px`}}>
      {display?<div style={{ width: '100%', height: '100%', display:'flex', alignItems:'center'}} ref={videoContainer}/>:null}
      </div>
      </div>
  )
}

export default VideoPlayer
