import React, { useEffect } from 'react';
import className from 'classnames';
import { Card } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';
import '../assets/styles/components/WaypointCard.css';

const WaypointCard = (props) => {
  const { i, setComponentNumberstate, componentNumberstate, text } = props;
  const { ref, inView } = useInView();
  useEffect(() => {
    const auxarray = Array(...componentNumberstate);
    auxarray[i] = inView;
    setComponentNumberstate(auxarray);
  }, [inView]);
  return (
    <div ref={ref} className="w-card-div">
      {text ? (
        text.map((card, j) => (
          <div
            className={className('w-card', { 'w-card-first': j === 0 }, { 'w-card-last': j === text.length - 1 })}
            id={`desc${i}-${j}`}
            key={`${i}-${j}`}
          >
            <Card>
              <Card.Body>
                <Card.Text>{card}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))
      ) : (
        <div className="desc" id={`desc${i + 1}`} key={`${i}-0`}>
          <Card>
            <Card.Body>
              <Card.Text>Loading</Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};
export default WaypointCard;
