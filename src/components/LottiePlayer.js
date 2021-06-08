import React, { useEffect, useRef, useState } from 'react';
import '@lottiefiles/lottie-player';
import usePositionPercent from '../PersonalHooks/usePositionPersent';
import bodymovin from 'lottie-web';

const LottiePlayer = React.memo((props) => {
  const { src, mode, renderer, id, i } = props;
  const [change, setChange] = useState(false);
  const ref = useRef();
  const animation = useRef(null);
  const containerRef = useRef();
  const [percent, setRef] = usePositionPercent(containerRef.current);
  const [animLoaded, setAnimLoaded] = useState(false);
  useEffect(() => {
    if (animation.current && animLoaded) {
      const fr = Math.ceil((percent / 100) * animation.current.totalFrames);
      console.log(percent, fr, animation.current.totalFrames);
      animation.current.goToAndStop(fr, true);
    }
  }, [percent, animLoaded]);
  useEffect(() => {
    setChange(true);
  }, [src]);
  useEffect(() => {
    console.log('Change', change);
    if (change) {
      setChange(!change);
    }
    if (ref.current) {
      const lottie = ref.current;
      console.log(src);
      animation.current = bodymovin.loadAnimation({
        wrapper: lottie,
        animType: 'canvas',
        autoplay: false,
        loop: true,
        path: src,
      });
      animation.current.addEventListener('DOMLoaded', function (e) {
        containerRef.current = document.querySelector(`#step${i}`);
        setRef(containerRef);
        console.log('loaded', animation.current.totalFrames);
        setAnimLoaded(true);
      });
      animation.current.addEventListener('enterFrame', function (e) {
        const canvas = animation.current?.wrapper?.childNodes[0];
        if (canvas) {
          try {
            animation.current.resize();
            console.log('Resize', animation);
          } catch (e) {
            console.log(e);
          }
        }
      });
    }
    return () => {
      setAnimLoaded(false);
    };
  }, [src, ref.current, id, change]);
  return <>{src && !change ? <div ref={ref} id={'lottie_' + i} style={{ width: '100%' }}></div> : null}</>;
});

export default LottiePlayer;
