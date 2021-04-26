import React from 'react';
import albumImg from '../assets/images/albums/album12.jpg';

const RecordPlayer = () => {
    return (
        <div className="single" id="album-12"
             data-side1="mp3/Dream_On_This_Side.mp3,mp3/Stolen_Dreams_Backing_Track.mp3,mp3/Old_Man_and_the_Sea_II.mp3"
             data-side2="mp3/Beyond_Jupiter.mp3,mp3/Dawn's_Battle.mp3,mp3/Beautiful_Paranoia.mp3">
            <div className="img-wrap img-wrap--single">
                <img className="img img--single" src={albumImg} alt="Whistlespankers"/>
            </div>
            <span className="number">12<span className="number__total">12</span></span>
            <span className="year year--single">1990</span>
            <h2 className="artist artist--single">The Whistlespankers</h2>
            <h3 className="title title--single">Nigel &amp; Me</h3>
        </div>
    )
};

export default RecordPlayer;
