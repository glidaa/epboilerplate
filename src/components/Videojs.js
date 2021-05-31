import "video.js/dist/video-js.css";
import "../assets/styles/components/Video.css";

import React, { useEffect, useRef, useState, useMemo } from "react";
import videoJs from "video.js";

const VideoPlayer = ({ src, isVisible, width, shouldPreload, placeholder }) => {
  const videoContainer = useRef();
  const [player, setPlayer] = useState();

  const videoJsOptions = useMemo(
    () => ({
      // techOrder: ['html5', 'flash'],
      controls: true,
      autoplay: true,
      fluid: false,
      loop: true,
      height: "100%",
      muted: true,
      sources: [{ src: src }],
    }),
    [src]
  );

  //  Setup the player
  useEffect(() => {
    if (isVisible || shouldPreload) {
      if (!player) {
        setPlayer(videoJs(videoContainer.current, videoJsOptions,function onPlayerReady() {
        }));
      } else if (player && isVisible) {
        player.play();
      }
    } else if (!isVisible && player) {
      try{
        player.pause();
        player.currentTime(0);
      }catch(e){
      }
    }
  }, [isVisible, player, videoJsOptions, shouldPreload]);

  return (
    <div
      className="left-side video"
      style={{
        display: isVisible ? "flex" : "none",
      }}
    >
      <div className="video__div" style={{ width: `${width}px` }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            data-vjs-player
            style={{
              backgroundImage: `url(${placeholder})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          >
            <video ref={videoContainer} className="video-js" width="640" height="360"></video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
