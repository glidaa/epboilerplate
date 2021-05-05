import React from 'react';
import '../assets/styles/components/Header.css';

import Fake3dContainer from "./Fake3dContainer";

import imageUrlTopQantas from "../assets/images/topqantas.jpg";
import imageDepthMapUrlTopQantas from "../assets/images/topqantas-depthmap.png";

const Header = (props) => {
  const { header='fdsfdkop',fonts } = props;
  console.log('props',props);
  return (
    <>
      {header ? (
        <div className="Header" style={{ backgroundColor: header?.backgroundColor ? header.backgroundColor : 'white' }}>
            <div className="Header-Img">
          <img src={header?.background ? header.background : null} alt={header?.alt}></img>
          <Fake3dContainer
            imageUrl={imageUrlTopQantas}
            imageDepthMapUrl={imageDepthMapUrlTopQantas}
            width={500} 
            height={500}
          />
            </div>
          <div className="header_Title">
            {/*<h1 className="Header_h1" style={{ fontFamily: fonts?.families[0], fontSize:fonts?.fontSize , color:fonts?.color ? fonts.color : 'whitesmoke'}}>
              {header?.title}
            </h1>*/}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Header;
