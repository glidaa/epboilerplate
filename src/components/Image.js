import React, { useEffect, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector/build/withPolyfill';
import className from 'classnames';
import './Image.css';

const Image = (props) => {
  const { src, isVisible } = props;
  const [visible, setVisible] = useState(false);
  const [TransForm, setTransForm] = useState({
    hover: false,
    scale: 1,
    translate: { x: 0, y: 0 },
    rotate: 0,
    speed: 0.5
  });
  const [ImgProps, setImgProps] = useState({width:1080, heigth: 720})
  const { width, height, ref } = useResizeDetector();

  useEffect(() => {
    if (visible !== isVisible) {
      setTimeout(() => {
        const AuxTransform = TransForm;
        AuxTransform.speed = 0.5;
        setTransForm({ ...AuxTransform });
        setVisible(isVisible);
      });
    }
  }, [isVisible]);
  const Load = (prop) =>{
    setImgProps({width:prop.target.naturalWidth, height:prop.target.naturalHeight})
  }
  const MouseEnter = (event) => {
    const AuxTransform = TransForm;
    AuxTransform.hover = true;
    AuxTransform.scale = 1.2;
    AuxTransform.speed = 0.3;
    setTransForm({ ...AuxTransform });
    setTimeout(() => {
        const AuxTransform = TransForm;
        AuxTransform.speed = 0;
        setTransForm({ ...AuxTransform });
    },100);
};
const MouseLeave = (event) => {
    const AuxTransform = TransForm;
    AuxTransform.hover = false;
    AuxTransform.scale = 1;
    AuxTransform.speed = 0.5;
    AuxTransform.translate = { x:0, y:0 };
    setTransForm({ ...AuxTransform });
  };
  const MoveImage = (event) => {
    const AuxTransform = TransForm;
    AuxTransform.translate = { x: event.clientX / 10, y: event.clientY / 10 };
    setTransForm({ ...AuxTransform });
  };
  const CalculaDimention = (w1,h1,w2,h2) =>{
    if(((w2)/w1)*h1>=h2){
      return true
    }
    return false
  }
  return (
    <div ref={ref} style={{width:'100%'}}>

      <img
        onLoad={Load}
        srcSet={src}
        alt=""
        className={className('Image', { 'Image-Hide': !visible })}
        // onMouseMove={MoveImage}
        // onMouseEnter={MouseEnter}
        // onMouseLeave={MouseLeave}
        style={{
          transition: `${TransForm.speed}s ease-in-out all`
        }}
        />
      </div>
  );
};

export default Image;
