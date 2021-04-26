import React from 'react';
import playSVG from '../assets/images/play.svg';
import stopSVG from '../assets/images/stop.svg';
const Controls = () => {
    return (
        <div className="controls">
            <button className="control-button control-button--play" aria-label="Play record">
                <svg className="icon icon--progress" viewBox="0 0 70 70">
                    <circle cx="35" cy="35" r="24.15"/>
                    <path d="M35,7c15.5,0,28,12.5,28,28S50.5,63,35,63S7,50.5,7,35S19.5,7,35,7z"/>
                </svg>
                <svg className="icon icon--play">
                    <use xlink:href={playSVG} />
                </svg>
            </button>
        </div>
    )
};

export default Controls;
