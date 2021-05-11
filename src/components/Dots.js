import React, { useState, useEffect } from 'react';
import '../assets/styles/components/Dots.css';
import className from 'classnames';
import { Link } from 'react-scroll';

const Dots = (props) => {
  const { componentNumberstate, slides, isHeader } = props;

  const [scrollState, setScrollState] = useState({
    previous: {
      slide: 0,
      card: 0,
    },
    current: {
      slide: 0,
      card: 1,
    },
  });
  useEffect(() => {
    console.log("scrollState",scrollState)
  }, [scrollState])
  useEffect(() => {
    let currentSlide = componentNumberstate?.currentScrollState ? componentNumberstate.currentScrollState.slide : -1;
    if (currentSlide !== -1) {
      let currentCard = componentNumberstate?.currentScrollState ? componentNumberstate.currentScrollState.card : -1;
      if (currentCard !== -1) {
        setScrollState((prevScrollState) => {
          if (prevScrollState.current.slide === currentSlide && prevScrollState.current.card === currentCard) return prevScrollState;
          return {
            previous: {
              slide: prevScrollState.current.slide,
              card: prevScrollState.current.card,
            },
            current: {
              slide: currentSlide,
              card: currentCard,
            },
          };
        });
      }
    }
  }, [componentNumberstate?.currentScrollState]);

  const handleSetActive = (to) => {};
  return (
    <div className={className('Dots', { 'Dots-Absolute': isHeader })}>
      <div className="Dots-central">
        {slides?.length > 0 && <Worm scrollState={scrollState} items={slides} />}
        {slides?.length > 0
          ? slides?.map((item, i) => {
              return (
                <div key={i} className="Dots-central">
                  <Link
                    to={`Slide${i}.0`}
                    spy={true}
                    smooth={true}
                    offset={-200}
                    duration={500}
                    onSetActive={handleSetActive}
                    className={className('Dots-circle', {
                      'Dots-Active': componentNumberstate?.inViewData.isView === i,
                    })}
                  />
                  {item.cards?.length > 1 && componentNumberstate?.inViewData.isView === i
                    ? item.cards.map((subitem, j) => {
                        return (
                          <Link
                            key={j}
                            to={`Slide${i}.${j}`}
                            spy={true}
                            smooth={true}
                            offset={0}
                            duration={500}
                            onSetActive={handleSetActive}
                            className={className('Dots-circle', 'Dots-SubCircle', {
                              'Dots-Sub-Active': componentNumberstate?.inViewData[i]?.isSubView[j],
                            })}
                          />
                        );
                      })
                    : null}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

const Worm = ({ scrollState, items }) => {
  console.log("ITEMS", items)
  const speed = 225;
  const diff = 22;
  const diffSmall = 17;
  const sizeSmall = 7;
  const sizeNormal = 12;

  const [state, setState] = useState({
    height: sizeNormal,
    width: sizeNormal,
    top: 5 + 22,
  });

  const getDotOffset = (index) =>
    document.querySelectorAll('.Dots-circle')[index]?.offsetTop - document.querySelector('.Dots-central')?.offsetTop;
  const isMulticard = () => items[scrollState.current.slide].cards.length > 1;
  const isScrollingDown = ({ current, previous }) => {
    if (current.slide === previous.slide){
      return current.card > previous.card
    } 
    else return current.slide > previous.slide;
  };
  
  useEffect(() => {
    let { current, previous } = scrollState;
    
    if (isScrollingDown(scrollState)) {
      // Scrolling down
      let top = 0;
      let afterTop = 0;
      if (previous.slide === current.slide) {
        // Move on same slide
        top = getDotOffset(previous.slide + previous.card + 1);
        afterTop = getDotOffset(current.slide + current.card + 1);
      } else {
        top = getDotOffset(previous.slide);
        afterTop = getDotOffset(isMulticard()?current.slide+1:current.slide);
      }

      setState({
        height: isMulticard() ? sizeSmall + diffSmall : sizeNormal + diff,
        width: isMulticard() ? sizeSmall : sizeNormal,
        top: top,
      });
      
      setTimeout(() => {
        setState({
          height: isMulticard() ? sizeSmall : sizeNormal,
          width: isMulticard() ? sizeSmall : sizeNormal,
          top: afterTop,
        });
      }, speed);
    } else {
      // Scrolling up
      
      setState({
        height: isMulticard() ? sizeSmall + diffSmall : sizeNormal + diff,
        width: isMulticard() ? sizeSmall : sizeNormal,
        top: getDotOffset(!isMulticard()?current.slide + current.card:current.slide + current.card+1),
      });
      
      setTimeout(() => {
        setState({
          height: isMulticard() ? sizeSmall : sizeNormal,
          width: isMulticard() ? sizeSmall : sizeNormal,
          top: getDotOffset(!isMulticard()?current.slide + current.card:current.slide + current.card+1),
        });
      }, speed);
    }
  }, [scrollState]);

  return (
    <div
      style={{
        position: 'absolute',
      }}
    >
      <div
        style={{
          borderRadius: '12px',
          width: state.width,
          height: state.height,
          backgroundColor: '#3584f7',
          position: 'absolute',
          top: state.top,
          right: isMulticard() ? -4 : -6,
          zIndex: 1,
          transition: `all ${speed}ms`,
        }}
      ></div>
    </div>
  );
};

export default Dots;
