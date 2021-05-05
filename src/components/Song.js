import React, { useState, useRef, useCallback } from "react";
import albumImg from "../assets/images/albums/album12.jpg";
import song from "../assets/mp3/Dream_On_This_Side.mp3";
import Controls from "./Controls";

const Song = ({ data }) => {
  const [isPlayed, setIsPlayed] = useState(false);
  const [isFirstPlay, setIsFirstPlay] = useState(false);
  const songRef = useRef();
  const playOrPause = useCallback(() => {
    if (isPlayed) {
      songRef.current.pause();
    } else {
      songRef.current.play();
    }

    if (!isFirstPlay) {
      setTimeout(() => {
        setIsFirstPlay(!isFirstPlay);
      }, 2000);
      setIsPlayed(!isPlayed);
    } else {
      setIsPlayed(!isPlayed);
    }
  }, [isPlayed]);

  const resetAudio = useCallback(() => {
    setIsPlayed(false);
    setIsFirstPlay(false);
  }, []);

  return (
    <div className="record-player-wr">
      <div className="single" id="album-12">
        <div className="img-wrap img-wrap--single">
          <img className="img img--single" src={albumImg} alt="Whistlespankers" />
        </div>
        <span className="year year--single">{data.year}</span>
        <div className="artist-name">
          <h2 className="artist artist--single">{data.artist}</h2>
          <h3 className="title title--single">{data.title}</h3>
        </div>
        <div ref={songRef} src={song} autoPlay={false} loop={false} onEnded={resetAudio} />
      </div>
      <Controls isPlayed={isPlayed} playOrPause={playOrPause} isFirstPlay={isFirstPlay} />
    </div>
  );
};

export default Song;
