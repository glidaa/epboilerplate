import React, { useEffect } from 'react';
import className from 'classnames';
import { useInView } from 'react-intersection-observer';
import { Element } from 'react-scroll';
import '../assets/styles/components/SubCard.css'

const SubCard = (props) => {
  const { j, length, i, isText, card, setSubview, background, styles } = props;
  const [refView, inView] = useInView();

  useEffect(() => {
    if(inView) setSubview(j);
  }, [inView]);

  const setHTML = (data) => {
    data = Array.isArray(data) ? data.filter((t) => t !== ',') : data;
    return { __html: data };
  };
  const auxStyles = styles?styles:{}
  const visible = card?{}:{border: 'none', 'boxShadow': 'none', 'backgroundColor': 'transparent'}
  return (
    <div
      className={className('w-card', { 'w-card-first': j === 0 }, { 'w-card-last': j === length - 1 })}
      id={`desc${i}-${j}`}
      key={`${i}-${j}`}
      >
      <Element name={`Slide${i}.${j}`} style={{position: "relative", width:'100%'}}>
      <div 
                  className={className({ 'Scard-text': isText },'SubCard-Text')}
                  ref={refView}
                  style={{
                    backgroundImage: background?.length > 0 ? `url(${background[Math.floor(Math.random() * background.length)]?.url})` : null,
                    ...auxStyles,
                    ...visible
                  }}
                >
                  <div className="card-body"
                    id={`descc${i}-${j}`}
                  >
                    <div dangerouslySetInnerHTML={setHTML(card)}></div>

                  </div>
                  </div>
        </Element>
    </div>
  );
};
export default SubCard;
