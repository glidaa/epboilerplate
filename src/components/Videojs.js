import "video.js/dist/video-js.css";
import "../assets/styles/components/Video.css";

import React, { useEffect, useRef, useState, useMemo } from "react";
import videoJs from "video.js";

const VideoPlayer = ({ src, isVisible, width }) => {
  const videoContainer = useRef();
  const [player, setPlayer] = useState();

  const videoJsOptions = useMemo(
    () => ({
      // techOrder: ['html5', 'flash'],
      controls: false,
      autoplay: false,
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
    if (isVisible) {
      if (!player) {
        setPlayer(videoJs(videoContainer.current, videoJsOptions));
      } else {
        player.play();
      }
    } else if (!isVisible && player) {
      player.pause();
      player.currentTime(0);
    }
  }, [isVisible, player, videoJsOptions]);

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
          <div data-vjs-player>
            <video
              ref={videoContainer}
              className="video-js"
              width="640"
              height="360"
            ></video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
