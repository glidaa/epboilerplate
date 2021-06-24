import React, { useEffect, useRef, useState } from 'react';

const usePositionPercent = (initialState,rep) => {
  const RefObserver = useRef(initialState);
  const resizeObserver = useRef(null);
  const [visible, setvisible] = useState(false);
  const [ref, setRef] = useState(RefObserver)
  const y1Ant = useRef(-1);
  const callback = useRef()
  useEffect(() => {
    callback.current = rep;
}, [rep]);
  useEffect(() => {
      RefObserver.current = ref.current
      if(RefObserver.current)
      Observer()
    }, [ref])
    const Observer = () => {
      getObserver().observe(ref.current);
    };
  function getObserver() {
      if (resizeObserver.current === null) {
          resizeObserver.current = new IntersectionObserver((t) => {
              setvisible(t[0].isIntersecting);
            });
        }
    return resizeObserver.current;
  }
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      var y1 = window.scrollY.toFixed(1);
      if(y1Ant.current !== y1){
        const {top,height} = ref.current.getBoundingClientRect()
        y1Ant.current = y1
      const y2 = window.innerHeight;
      const y3 = y2 + height;
      const yn = top + height;
      var auxPercent = (1 - ((yn / y3))).toFixed(2);
      // console.log(y1,y2,y3,yn,auxPercent,top,height )
      if (auxPercent < 0) auxPercent = 0;
      if (auxPercent > 1) auxPercent = 1;
      if(auxPercent !== percent){
        if(callback.current){
          callback.current(auxPercent)
        }
        setPercent(auxPercent)
      }
    }
    };
    if (visible) window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible,ref]);
  return [percent,setRef]
};
export default usePositionPercent;
