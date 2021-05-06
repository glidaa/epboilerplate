import React, { useState } from "react";
import Song from "./Song";
import Slider from "react-slick";
import "../assets/styles/components/RecordPlayer.css";
import SongsData from "../assets/songs";

const RecordPlayer = () => {
  const [index, setIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} beforeChange={(_, i) => setIndex(i)}>
      {SongsData.map((song) => (
        <Song data={song} index={index} key={song.index} />
      ))}
    </Slider>
  );
};

export default RecordPlayer;
