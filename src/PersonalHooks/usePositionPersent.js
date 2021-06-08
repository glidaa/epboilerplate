import React, { useEffect, useRef, useState } from 'react';

const usePositionPercent = (initialState) => {
  const RefObserver = useRef(initialState);
  const resizeObserver = useRef(null);
  const [visible, setvisible] = useState(false);
  const [ref, setRef] = useState(RefObserver)
  useEffect(() => {
      RefObserver.current = ref.current
      if(RefObserver.current)
      Observer()
    }, [ref])
    const Observer = () => {
      getObserver().observe(RefObserver.current);
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
      const y1 = window.scrollY;
      const y2 = window.screen.availHeight;
      const y3 = y2 + RefObserver.current.clientHeight;
      const yn = RefObserver.current.offsetTop + RefObserver.current.clientHeight - y1;
      const iPercent = (yn / y3) * 100;
      var auxPercent = 100 - iPercent;
      if (auxPercent < 0) auxPercent = 0;
      if (auxPercent > 100) auxPercent = 100;
      setPercent(auxPercent)
      console.log(auxPercent+'%')
    };
    if (visible) window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible,RefObserver]);
  return [percent,setRef]
};
export default usePositionPercent;
