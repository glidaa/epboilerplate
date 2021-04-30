import React, { useEffect } from 'react';
import className from 'classnames';
import { Card } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';
import { Element } from 'react-scroll';

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
  return (
    <div
      className={className('w-card', { 'w-card-first': j === 0 }, { 'w-card-last': j === length - 1 })}
      id={`desc${i}-${j}`}
      key={`${i}-${j}`}
    >
                    <Element name={`Slide${i}.${j}`} style={{position: "relative", width:'100%'}}>
      <Card
        ref={refView}
        className={className({ 'card-text': isText })}
        style={{ backgroundImage: background?.length > 0 ? `url(${background[Math.floor(Math.random() * (background.length))]?.url})` : null, ...auxStyles }}
      >
        <Card.Body>
          <div dangerouslySetInnerHTML={setHTML(card)}></div>
        </Card.Body>
      </Card>
        </Element>
    </div>
  );
};
export default SubCard;
