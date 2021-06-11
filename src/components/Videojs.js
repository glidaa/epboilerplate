import "video.js/dist/video-js.css";
import "../assets/styles/components/Video.css";

import React, { useEffect, useRef, useState, useMemo } from "react";
import videoJs from "video.js";

const VideoPlayer = ({ src, isVisible, width, shouldPreload, placeholder }) => {
  const videoContainer = useRef();
  const [player, setPlayer] = useState();
  const [stillVisible, setStillVisible] = useState(true);
  const [waiting, setWaiting] = useState(false)

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
    console.log("render")
    if (isVisible || shouldPreload) {
      if (!player) {
        setPlayer(videoJs(videoContainer.current, videoJsOptions,function onPlayerReady() {
        }));
      } else if (player && isVisible) {
        player.on("pause", function () {
            setStillVisible(true)
        });

        player.on("play", function () {
            setStillVisible(false)
        });
        player.on("waiting", function() {
            setWaiting(true)
            let interval = setInterval(() => {
              console.log("interval")
              if(!videoContainer.current.parentElement.classList.contains("vjs-waiting")){
                setWaiting(false)
                window.clearInterval(interval)
              }
            },800)
        })
        player.pause();
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
              backgroundImage: `url(${stillVisible ? placeholder : waiting ? placeholder: ''})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          >
            <video ref={videoContainer} className="video-js"></video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
