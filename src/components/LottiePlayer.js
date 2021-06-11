import React, { useEffect, useRef, useState } from 'react';
import usePositionPercent from '../PersonalHooks/usePositionPersent';
import bodymovin from 'lottie-web';

const LottiePlayer = React.memo((props) => {
  const { src, mode, renderer, id, i,Display,frames} = props;
  const [change, setChange] = useState(false);
  const ref = useRef();
  const animation = useRef(null);
  const containerRef = useRef();
  const [animLoaded, setAnimLoaded] = useState(false);
  const [Frames, setFrames] = useState(parseInt(frames,10)>0?parseInt(frames,10):null);
  const Disp = useRef()
  const First = useRef(true)
  Disp.current = Display
  useEffect(() => {
    if(Display){ console.log("changed",i)
    First.current = true;
    }
  }, [Display])
  const enterF = (e) =>{
    const canvas = animation.current?.container;
    if (canvas && Disp.current) {
        try {
          animation.current.resize();
        } catch (e) {
          console.log(e);
        }
      }
  }
  const rep = (value) =>{
      if (animation.current && animLoaded && First.current) {
        console.log("Console",First.current)
        const fr = Math.ceil(value * Frames);
        if(animation.current.currentFrame !== fr){
          animation.current.goToAndStop(fr, true);
            enterF()
        }
      }
  }
  const [percent, setRef] = usePositionPercent(containerRef.current,rep);
  useEffect(() => {
    setChange(true);
  }, [src]);
  useEffect(() => {

    const DomL = (e) => {
      containerRef.current = document.querySelector(`#step${i}`);
      if(Frames===null || Frames > animation.current.totalFrames) setFrames(animation.current.totalFrames)
      setRef(containerRef);
      console.log('loaded', animation.current.totalFrames);
      setAnimLoaded(true);
    }

    console.log("Wtest")
    console.log('Change', change);
    if (change) {
      setChange(!change);
    }
    if (ref.current) {
      const lottie = ref.current;
      console.log(src);
      animation.current = bodymovin.loadAnimation({
        wrapper: lottie,
        renderer: 'canvas',
        autoplay: false,
        loop: true,
        path: src,
        rendererSettings: {
          scaleMode: 'noScale',
          clearCanvas: true,
        },
      });
      animation.current.addEventListener('DOMLoaded', DomL);
      // animation.current.addEventListener('enterFrame', enterF);
    }
    console.log("Status")
    return () => {
      setAnimLoaded(false);
      if(animation.current){
        animation.current.stop();
        animation.current.destroy();
        // animation.current.removeEventListener('DOMLoaded', DomL);
      }

    };
  }, [src, ref.current, id, change]);
  return <><div style={{position:"absolute"}}>{percent}</div>{src && !change ? <div ref={ref} id={'lottie_' + i} style={{ width: '100%' }}></div> : null}</>;
});

export default LottiePlayer;
