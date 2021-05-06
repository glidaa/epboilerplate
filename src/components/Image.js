import React, { useEffect, useState } from 'react';
import className from 'classnames';
import '../assets/styles/components/Image.css';

const Image = (props) => {
  const { width, key, src, isVisible } = props;
  const [visible, setVisible] = useState(false);
  const [TransForm, setTransForm] = useState({
    hover: false,
    scale: 1,
    translate: { x: 0, y: 0 },
    rotate: 0,
    speed: 0.5
  });
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
  return (
    <div>
      <img
        srcSet={src}
        alt=""
        className={className('Image', { 'Image-Hide': !visible })}
        onMouseMove={MoveImage}
        onMouseEnter={MouseEnter}
        onMouseLeave={MouseLeave}
        onScroll={console.log()}
        style={{
          margin: '10% 40%',
          transform: `scale(${TransForm.scale}) translate(${TransForm.translate.x}px, ${TransForm.translate.y}px) rotate(${TransForm.rotate}deg)`,
          transition: `${TransForm.speed}s ease-in-out all`
        }}
      />
    </div>
  );
};

export default Image;
