import React, { useState, useRef, useCallback, useEffect } from "react";
import Controls from "./Controls";

const Song = ({ data, index }) => {
  const [isPlayed, setIsPlayed] = useState(false);
  const [isFirstPlay, setIsFirstPlay] = useState(false);
  const [songNumber, setSongNumber] = useState(0);
  const songRef = useRef();

  const playOrPause = useCallback(() => {
    if (isPlayed) {
      songRef.current.pause();
    } else {
      songRef.current.play();
    }

    if (!isFirstPlay) {
      setIsFirstPlay(!isFirstPlay);
      setIsPlayed(!isPlayed);
    } else {
      setIsPlayed(!isPlayed);
    }
  }, [isPlayed]);

  const playNext = () => {
    if (songNumber < data.data.length - 1) {
      songRef.current.src = data.data[songNumber + 1];
      songRef.current.play();
      setSongNumber(songNumber + 1);
    } else {
      setSongNumber(0);
      songRef.current.src = data.data[0];
      resetAudio();
    }
  };

  const resetAudio = useCallback(() => {
    setIsPlayed(false);
    setIsFirstPlay(false);
  }, []);

  useEffect(() => {
    if (index !== data.index) {
      songRef.current.pause();
      songRef.current.currentTime = 0;
      resetAudio();
    }
  }, [index, data.index, resetAudio]);

  return data.data ? (
    <div className="record-player-wr">
      <div className="single" id="album-12">
        <div className="img-wrap img-wrap--single">
          <img className="img img--single" src={data.img} alt="Whistlespankers" />
        </div>
        <span className="year year--single">{data.year}</span>
        <div className="artist-name">
          <h2 className="artist artist--single">{data.artist}</h2>
          <h3 className="title title--single">{data.title}</h3>
        </div>
        <audio ref={songRef} src={data.data[0]} autoPlay={false} loop={false} onEnded={playNext} />
      </div>
      <Controls isPlayed={isPlayed} playOrPause={playOrPause} isFirstPlay={isFirstPlay} />
    </div>
  ) : (
    <div></div>
  );
};

export default Song;
