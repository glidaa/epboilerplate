import React from 'react';
import '../assets/styles/components/Header.css';
import { useResizeDetector } from 'react-resize-detector/build/withPolyfill';

import Fake3dContainer from "./Fake3dContainer";

const Header = (props) => {
  const { header,fonts, reff, isView } = props;
  const { height, width, ref } = useResizeDetector();

  return (
    <>
      {header && header.imageUrlTop && header.imageDepthMapUrlTop ? (
        <div ref={ref} className="Header" style={{ backgroundColor: header?.backgroundColor ? header.backgroundColor : 'black'}}>
          <div style={{height:"70vh"}} ref={reff}>
            <div className="Header-Img">
          <img src={header?.background ? header.background : null} alt={header?.alt}></img>
          <Fake3dContainer
            imageUrl={header.imageUrlTop}
            imageDepthMapUrl={header.imageDepthMapUrlTop}
            width={width<height?width:height} 
            height={width<height?width:height}
          />
            </div>
          <div className="header_Title">
            {/*<h1 className="Header_h1" style={{ fontFamily: fonts?.families[0], fontSize:fonts?.fontSize , color:fonts?.color ? fonts.color : 'whitesmoke'}}>
              {header?.title}
            </h1>*/}
          </div>
        </div>
      </div>
      ) : null}
    </>
  );
};
export default Header;
