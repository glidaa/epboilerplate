import React, { useEffect, useState } from 'react';
import { iOS, isSafari } from './iosSupport';
import className from 'classnames';
import { useResizeDetector } from 'react-resize-detector/build/withPolyfill';
import { useInView } from 'react-intersection-observer';

import LottiePlayer from './LottiePlayer';
import WaypointCard from './WaypointCard';

import '../assets/styles/components/Scrollyteller.css';
//import Video from './Video-React-player';
import Videojs from './Videojs';
import Dots from './Dots';
import Header from './Header';
//import VideoDash from './VideoDash'

const Explainerpage = (props) => {
  const { width, ref } = useResizeDetector();
  const { itemJsonFile } = props;
  const [itemJson, setItemJson] = useState([]);
  useEffect(() => {
    if (!itemJsonFile) {
      fetch(process.env.PUBLIC_URL + '/items.json?v=' + Date.now())
        .then((response) => response.json())
        .then((data) => {
          setItemJson(data);
        })
        .catch(function (err) {
          console.log('Error: ', err);
        });
    } else {
      console.log('ExplainerPage:', itemJson.dataFile);
      setItemJson(itemJsonFile);
    }
  }, [itemJsonFile]);
  useEffect(() => {
    if (itemJson?.fonts) {
      var new_font = new FontFace(itemJson.fonts.families[0], 'url(' + itemJson.fonts.urls[0] + ')');
      new_font
        .load()
        .then(function (loaded_face) {
          // use font here
          console.log('La fuente cargó');
          document.fonts.add(loaded_face);
        })
        .catch(function (error) {});
    }
  }, [itemJson]);

  const isSafarioIos = className(`left-side ${isSafari() || iOS() ? 'scrollyTeller-lottie-height' : ''}`);

  const [componentNumberstate, setComponentNumberstate] = useState([]);
  const [waypointRef, SetWaypointRef] = useState([]);
  const [refView, inView] = useInView();
  return (
    <>
      {itemJson?.header ? (
        <div ref={refView}>
          <Header header={itemJson?.header} fonts={itemJson?.fonts} />
        </div>
      ) : null}
      <div style={{ position: 'relative' }}>
        <Dots
          isHeader={inView}
          setComponentNumberstate={setComponentNumberstate}
          componentNumberstate={componentNumberstate}
          itemJson={itemJson.data}
        />
        <div ref={ref} className="Scrollyteller">
          <section className="main Scrollyteller__section">
            <div className="graphic">
              {itemJson?.data?.length > 0
                ? itemJson.data.map((left, i) => {
                    switch (left[0].slideType) {
                      case 'video':
                        return (
                          <Videojs
                            width={width}
                            key={i}
                            src={componentNumberstate[i]?.isView ? left[0].data : left[0].data}
                            visible={componentNumberstate[i]?.isView}
                            display={componentNumberstate[i]?.isView}
                          />
                        );
                      case 'text':
                        return (
                          <div
                            className="left-side text video"
                            key={i}
                            style={{
                              display: componentNumberstate[i]?.isView ? 'flex' : 'none',
                            }}
                          >
                            <div />
                          </div>
                        );

                      case '2d':
                        return (
                          <div
                            className={isSafarioIos}
                            style={{
                              display: componentNumberstate[i]?.isView ? 'flex' : 'none',
                              width: '100%',
                              transformOrigin: '0px 0px 0px',
                            }}
                            id={`canvascontainer${i}`}
                            key={i}
                          >
                            {
                              <LottiePlayer
                                className="left-side"
                                id={`lottie${i}`}
                                mode="seek"
                                src={left[0].data}
                                key={i}
                                renderer="canvas"
                                frames={left[0].frames}
                              />
                            }
                          </div>
                        );
                      default:
                        return null;
                    }
                  })
                : null}
            </div>
            <div className="scroller" id="scroller">
              {itemJson?.data?.length > 0 ? (
                itemJson.data.map((narr, i) => (
                  <WaypointCard
                    key={i}
                    setComponentNumberstate={setComponentNumberstate}
                    componentNumberstate={componentNumberstate}
                    SetWaypointRef={SetWaypointRef}
                    i={i}
                    text={narr?.map((card) => card.description)}
                    styles={narr?.map((card) => card.style)}
                    isText={narr[0].slideType === 'text'}
                    isFirst={i === 0}
                    isLast={i === itemJson.data.length - 1}
                    background={itemJson.background}
                  />
                ))
              ) : (
                <WaypointCard
                  key={0}
                  setComponentNumberstate={setComponentNumberstate}
                  componentNumberstate={componentNumberstate}
                  SetWaypointRef={SetWaypointRef}
                  i={0}
                  text={['Loading']}
                  isText={false}
                  isFirst={true}
                  isLast={true}
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Explainerpage;
