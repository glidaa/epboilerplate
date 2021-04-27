import React, {useEffect, useRef} from 'react';

const play = (
    <symbol id="icon-play" viewBox="0 0 20 20">
        <title>play</title>
        <path d="M15 10.001c0 0.299-0.305 0.514-0.305 0.514l-8.561 5.303c-0.624 0.409-1.134 0.106-1.134-0.669v-10.297c0-0.777 0.51-1.078 1.135-0.67l8.561 5.305c-0.001 0 0.304 0.215 0.304 0.514z"></path>
    </symbol>
);

const pause = (
    <symbol id="icon-pause" viewBox="0 0 20 20">
        <title>pause</title>
        <path d="M15 3h-2c-0.553 0-1 0.048-1 0.6v12.8c0 0.552 0.447 0.6 1 0.6h2c0.553 0 1-0.048 1-0.6v-12.8c0-0.552-0.447-0.6-1-0.6zM7 3h-2c-0.553 0-1 0.048-1 0.6v12.8c0 0.552 0.447 0.6 1 0.6h2c0.553 0 1-0.048 1-0.6v-12.8c0-0.552-0.447-0.6-1-0.6z"></path>
    </symbol>
);

const circleRadius = 25;

const Controls = ({isPlayed, playOrPause, isFirstPlay}) => {

    return (
        <div className="controls">
            <svg display='none'>
                <defs>
                    {play}
                    {pause}
                </defs>
            </svg>
            <button className="control-button control-button--play" aria-label="Play record" onClick={playOrPause}>
                 <svg className="icon icon--progress" viewBox="0 0 70 70">
                    <circle cx="35" cy="35" r="24.15"/>
                </svg>
                {!isFirstPlay && isPlayed && <div className="circle-loader" />}

                <svg className="icon icon--play">
                    <use xlinkHref={`#icon-${isPlayed ? 'pause' : 'play'}`} />
                </svg>
            </button>
        </div>
    )
};

export default Controls;
