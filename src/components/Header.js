import React from 'react';
import '../assets/styles/components/Header.css';

const Header = (props) => {
  const { header,fonts } = props;
  return (
    <>
      {header ? (
        <div className="Header" style={{ backgroundColor: header?.backgroundColor ? header.backgroundColor : 'black' }}>
            <div className="Header-Img">
          <img src={header?.background ? header.background : null} alt={header?.alt}></img>

            </div>
          <div className="header_Title">
            <h1 className="Header_h1" style={{ fontFamily: fonts?.families[0], fontSize:fonts?.fontSize , color:fonts?.color ? fonts.color : 'whitesmoke'}}>
              {header.title}
            </h1>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Header;
