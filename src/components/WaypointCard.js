import React, { useEffect, useState } from 'react';
import className from 'classnames';
import { useInView } from 'react-intersection-observer';
import '../assets/styles/components/WaypointCard.css';
import { useResizeDetector } from 'react-resize-detector/build/withPolyfill';
import SubCard from './SubCard';

const WaypointCard = (props) => {
  const { i, setComponentNumberstate, componentNumberstate, text, isText, isFirst, isLast, background, styles } = props;
  const [refView, inView] = useInView();
  const { height, ref } = useResizeDetector();
  const [subview, setSubview] = useState([]);
  useEffect(() => {
    const auxarray = componentNumberstate;
    if (inView) {
      auxarray.inViewData = { isView: i, isSubView: subview };
      auxarray.currentScrollState = {
        slide: i,
        card: subview,
      };
    }
    setComponentNumberstate({ ...auxarray });
  }, [inView, subview, setComponentNumberstate]);
  // useEffect(()=>{
  //   setTimeout(() => {
  //     const auxarray = Array(...componentNumberstate);
  //   auxarray[i] = {isView:inView, isSubView:[...subview]};
  //   if(auxarray[i].isView)console.log(i,auxarray[i])
  //   setComponentNumberstate([...auxarray]);
  //   }, 1000);
  // },[])
  return (
    <div
      className={className('w-card-maindiv', { 'w-card-maindiv-first': isFirst }, { 'w-card-maindiv-last': isLast })}
      id={`step${i}`}
      key={i}
      style={{ height: isText ? `${height}px` : 'auto' }}
    >
      <div ref={refView} className={className('w-card-div', { 'w-card-text': isText })}>
        <div ref={ref} style={{ width: '100%' }}>
          {text ? (
            text.map((card, j) => (
              <SubCard
                key={j}
                setSubview={setSubview}
                j={j}
                length={text.length}
                i={i}
                isText={isText}
                card={card}
                background={isText ? null : background}
                styles={styles ? styles[j] : null}
              />
            ))
          ) : (
            <div className="desc" id={`desc${i + 1}`} key={`${i}-0`}>
              <SubCard
                setSubview={setSubview}
                j={0}
                text={text}
                i={0}
                isText={false}
                card={'Loading...'}
                background={isText ? null : background}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default WaypointCard;
