import 'video.js/dist/video-js.css';
import '../assets/styles/components/Video.css'

import React, { useEffect, useRef, useState } from 'react'
import VideoJs from 'video.js'

const videoJsOptions = {
  // techOrder: ['html5', 'flash'],
  controls: false,
  autoplay: false,
  fluid: false,
  loop: true,
  height: '100%',
  muted: true
}

const VideoPlayer = ({ src, display, width }) => {
  const videoContainer = useRef()
  const [auxPlayer, setAuxPlayer] = useState()
  //console.log(src)
  //  Setup the player
  const [load, setLoad] = useState(false)
  useEffect(() => {
    //  Setting content like this because player.dispose() remove also the html contentif
    //console.log(videoContainer)
    if(videoContainer?.current){

        videoContainer.current.innerHTML = `
        <div data-vjs-player>
        <video class="video-js" width="640" height="360" />
        </div>
        `
       const player = VideoJs(videoContainer.current.querySelector('video'), videoJsOptions, async () => {
        player.src({ src: src})
        setAuxPlayer(player)
    })
    
    //  When destruct dispose the player
    return () => player.dispose()
}
  }, [src])
  useEffect(() => {
  }, [auxPlayer])

  useEffect(() => {
    if(display && auxPlayer){
      auxPlayer.play()
    }else if(auxPlayer && !display){
      auxPlayer.pause()
      auxPlayer.currentTime(0)
    }
  }, [display,auxPlayer])

  return (
    <div
    className="left-side video"
    style={{
      display: display /*|| !display & !load */? 'flex' : 'none',
    }}
  >
    <div className="video__div" style={{width:`${width}px`}}>
      {<div style={{ width: '100%', height: '100%', display:'flex', alignItems:'center'}} ref={videoContainer}/>}
      </div>
      </div>
  )
}

export default VideoPlayer
