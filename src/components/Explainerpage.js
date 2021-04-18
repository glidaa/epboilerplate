import React, { useEffect, useState } from 'react';
import { iOS, isSafari } from './iosSupport';
import { create } from '@lottiefiles/lottie-interactivity';
import className from 'classnames';

import LottiePlayer from './LottiePlayer';
import WaypointCard from './WaypointCard';

import '../assets/styles/components/Scrollyteller.css';
//import Video from './Video-React-player';
import Videojs from './Videojs';
//import VideoDash from './VideoDash'

const Explainerpage = (props) => {
  const {itemJsonFile} = props;
  const [itemJson, setItemJson] = useState([]);
  useEffect(() => {
    if(!itemJsonFile){
      fetch(process.env.PUBLIC_URL + '/items.json?v=' + Date.now())
      .then((response) => response.json())
      .then((data) => {
        setItemJson(data);
      })
      .catch(function (err) {
        console.log('Error: ', err);
      });
    }else{
      setItemJson(itemJsonFile);
    }
  }, [itemJsonFile]);
  const isSafarioIos = className(`left-side ${isSafari() || iOS() ? 'scrollyTeller-lottie-height' : ''}`);

  const [componentNumberstate, setComponentNumberstate] = useState([]);

  useEffect(() => {
    const lotties = itemJson ? [...itemJson].filter((e) => e[0].frames !== '') : null;

    document.querySelectorAll('lottie-player').forEach((lottie, i) => {
      lottie.addEventListener('load', function (e) {
        create({
          mode: 'scroll',
          autoplay: false,
          player: `#lottie${lottie.id.split('lottie')[1]}`,
          container: `#step${Math.trunc(lottie.id.split('lottie')[1])}`,
          actions: [
            {
              visibility: [0, 0.8],
              type: 'seek',
              frames: [0, lotties[i][0].frames],
            },
          ],
        });
      });
      lottie.addEventListener('frame', function (e) {
        const canvasdiv = lottie.shadowRoot.querySelectorAll('.main > .animation');
        if (canvasdiv && canvasdiv.length > 0) {
          const canvasdivNodes = canvasdiv[0].childNodes;
          if (canvasdivNodes) {
            const canvas = canvasdivNodes[2];
            if (canvas) {
              lottie.resize();
            }
          }
        }
      });
    });
  }, [itemJson]);

  return (
    <div className="Scrollyteller">
      <section className="main Scrollyteller__section">
        <div className="graphic">
          {itemJson?.length > 0
            ? itemJson.map((left, i) => {
                switch (left[0].slideType) {
                  case 'video':
                    return (
                      <Videojs
                        key={i}
                        src={componentNumberstate[i] ? left[0].data : left[0].data}
                        visible={componentNumberstate[i]}
                        display={componentNumberstate[i]}
                      />
                    );
                  case 'text':
                    return (
                      <div
                        className="left-side text video"
                        key={i}
                        style={{
                          display: componentNumberstate[i] ? 'flex' : 'none',
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
                          display: componentNumberstate[i] ? 'flex' : 'none',
                          width: '100%',
                          transformOrigin: '0px 0px 0px',
                        }}
                        id={`canvascontainer${i}`}
                        key={i}
                      >
                        <LottiePlayer className="left-side" id={`lottie${i}`} mode="seek" src={left[0].data} key={i} renderer="canvas" />
                      </div>
                    );
                  default:
                    return null;
                }
              })
            : null}
        </div>
        <div className="scroller" id="scroller">
          {itemJson?.length > 0
            ? itemJson.map((narr, i) => (
                <WaypointCard
                  key={i}
                  setComponentNumberstate={setComponentNumberstate}
                  componentNumberstate={componentNumberstate}
                  i={i}
                  text={narr?.map((card) => card.description)}
                  isText={narr[0].slideType === 'text'}
                  isFirst={i === 0}
                  isLast={i === itemJson.length - 1}
                />
              ))
            : <WaypointCard
            key={0}
            setComponentNumberstate={setComponentNumberstate}
            componentNumberstate={componentNumberstate}
            i={0}
            text={["Loading"]}
            isText={false}
            isFirst={true}
            isLast={true}
          />
          }
        </div>
      </section>
    </div>
  );
};

export default Explainerpage;
