import React, { useEffect } from 'react';
import className from 'classnames';
import { Card } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';
const SubCard = (props) => {
  const { j, length, i, isText, card, setSubview, subview, background } = props;
  const [refView, inView] = useInView();

  useEffect(() => {
    const auxarray = Array(...subview);
    auxarray[j] = inView;
    setSubview(auxarray);
  }, [inView]);

  const setHTML = (data) => {
    data = Array.isArray(data) ? data.filter((t) => t !== ',') : data;
    return { __html: data };
  };
  return (
    <div
      className={className('w-card', { 'w-card-first': j === 0 }, { 'w-card-last': j === length - 1 })}
      id={`desc${i}-${j}`}
      key={`${i}-${j}`}
    >
      <Card
        ref={refView}
        className={className({ 'card-text': isText })}
        style={{ backgroundImage: background?.length > 0 ? `url(${background[Math.floor(Math.random() * (background.length))]?.url})` : null, width: '100%' }}
      >
        <Card.Body>
          <div dangerouslySetInnerHTML={setHTML(card)}></div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default SubCard;
