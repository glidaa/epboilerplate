import React, {useCallback, useRef, useState} from 'react';
import albumImg from '../assets/images/albums/album12.jpg';
import song from '../assets/mp3/Dream_On_This_Side.mp3';
import Controls from "./Controls";

const RecordPlayer = () => {
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
            }, 2000)
            setIsPlayed(!isPlayed);
        } else {
            setIsPlayed(!isPlayed)
        }
    }, [isPlayed]);

    const resetAudio = useCallback(() => {
        setIsPlayed(false);
        setIsFirstPlay(false);
    }, [])

    return (
        <>
            <div className="single" id="album-12" >
                <div className="img-wrap img-wrap--single">
                    <img className="img img--single" src={albumImg} alt="Whistlespankers"/>
                </div>
                <span className="year year--single">1990</span>
                <div className='artist-name'>
                    <h2 className="artist artist--single">The Whistlespankers</h2>
                    <h3 className="title title--single">Nigel &amp; Me</h3>
                </div>
                <audio ref={songRef} src={song} autoPlay={false} loop={false} onEnded={resetAudio}/>
            </div>
            <Controls isPlayed={isPlayed} playOrPause={playOrPause} isFirstPlay={isFirstPlay}/>
        </>
    )
};

export default RecordPlayer;
