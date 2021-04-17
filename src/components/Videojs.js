// import React from 'react';
// import videojs from 'video.js';
import 'video.js/dist/video-js.css';
// class VideoPlayer extends React.Component {
//   componentDidMount() {
//     this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
//       console.log('Video.js Ready', this);
//     });
//   }
//   componentWillUnmount() {
//     if (this.player) {
//       this.player.dispose();
//     }
//   }
//   render() {
//     return (
//       <div style={{ width: '100%', height: '100%' }}>
//         <div data-vjs-player>
//           <video ref={(node) => (this.videoNode = node)} className="video-js" style={{ width: '100%', height: '100vh' }}></video>
//         </div>
//       </div>
//     );
//   }
// }

// const Video = (props) => {
//   const { src, visible } = props;
//   console.log('Prueba', src);
//   const videoJsOptions = {
//     autoplay: true,
//     controls: true,
//     mute: true,
//     sources: [
//       {
//         src: 'https://explainerpage-assets.s3.amazonaws.com/salmonvideos/00topfull.mp4',
//         type: 'video/mp4',
//       },
//     ],
//   };
//   return (
//     <div
//       className="video__div"
//       style={{
//         display: visible ? 'flex' : 'none',
//       }}
//     >
//       {visible ? <VideoPlayer {...videoJsOptions} /> : null}
//     </div>
//   );
// };
// export default Video;


import React, { useEffect, useRef } from 'react'
//import { ConsoleLogger as Logger } from '@aws-amplify/core'
//import Storage from '@aws-amplify/storage'
import VideoJs from 'video.js'

//const logger = new Logger('VideoComponent')

const videoJsOptions = {
  // techOrder: ['html5', 'flash'],
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
