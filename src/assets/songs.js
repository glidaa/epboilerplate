import DreamOnThisSide from "./mp3/Dream_On_This_Side.mp3";
import DreamOnThisSideImg from "./images/albums/album12.jpg";

import BeyondJupiter from "./mp3/Beyond_Jupiter.mp3";
import BeyondJupiterImg from "./images/albums/album11.jpg";

import LunaLittleFriend from "./mp3/Luna's_Little_Friend.mp3";
import LunaLittleFriendImg from "./images/albums/album10.jpg";

import CavesOfSteel from "./mp3/Caves_of_Steel.mp3";
import CavesOfSteelImg from "./images/albums/album9.jpg";

const songs = [
  {
    index: 0,
    year: "1990",
    artist: "The Whistlespankers",
    title: "Nigel & Me",
    data: [DreamOnThisSide],
    img: [DreamOnThisSideImg],
  },
  {
    index: 1,
    year: "1985",
    artist: "The Green Lords",
    title: "Bacteria Invasion",
    data: [BeyondJupiter],
    img: [BeyondJupiterImg],
  },
  {
    index: 2,
    year: "2010",
    artist: "Insane Children",
    title: "Playground",
    data: [LunaLittleFriend],
    img: [LunaLittleFriendImg],
  },
  {
    index: 3,
    year: "2005",
    artist: "Skyrunners",
    title: "No problem, Housten",
    data: [CavesOfSteel],
    img: [CavesOfSteelImg],
  },
];

export default songs;
