import React, { useState, useEffect } from "react";
import Song from "./Song";
import Slider from "react-slick";
import "../assets/styles/components/RecordPlayer.css";

const RecordPlayer = () => {
  const [index, setIndex] = useState(0);
  const [songData, setSongData] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
  };

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/songs.json")
      .then((response) => response.json())
      .then((data) => {
        setSongData(data);
      })
      .catch(function (err) {
        console.log("Error: ", err);
      });
  }, []);

  return (
    <Slider {...settings} beforeChange={(_, i) => setIndex(i)}>
      {songData.map((song) => (
        <Song data={song} index={index} key={song.index} />
      ))}
    </Slider>
  );
};

export default RecordPlayer;
