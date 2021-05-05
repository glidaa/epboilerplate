import React, { useEffect, useState } from "react";
import Song from "./Song";
import Slider from "react-slick";
import "../assets/styles/components/RecordPlayer.css";

const RecordPlayer = () => {
  const [songs, setSongs] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/songs.json?v=" + Date.now())
      .then((response) => response.json())
      .then((data) => {
        setSongs(data);
      })
      .catch(function (err) {
        console.log("Error: ", err);
      });
  }, []);

  return (
    <Slider {...settings} beforeChange={() => console.log("swipe")}>
      {songs.map((song) => (
        <Song data={song} key={song.id} />
      ))}
    </Slider>
  );
};

export default RecordPlayer;
