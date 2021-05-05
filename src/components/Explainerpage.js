import React, { useEffect, useState } from 'react';
import { iOS, isSafari } from './iosSupport';
import className from 'classnames';
import { useResizeDetector } from 'react-resize-detector/build/withPolyfill';
import { useInView } from 'react-intersection-observer';

import LottiePlayer from "./LottiePlayer";
import WaypointCard from "./WaypointCard";

import "../assets/styles/components/Scrollyteller.css";
//import Video from './Video-React-player';
import Videojs from "./Videojs";
import Dots from "./Dots";
import Header from "./Header";
//import VideoDash from './VideoDash'

const Explainerpage = (props) => {
  const { width, ref } = useResizeDetector();
  const { itemJsonFile } = props;
  const [itemJson, setItemJson] = useState({});
  //DON'T DELETE
  // useEffect(() => {
  //   console.log('Test');
  //   if (!itemJsonFile) {
  //     fetch(process.env.PUBLIC_URL + '/items.json?v=' + Date.now())
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setItemJson(data);
  //         console.log("ITEMJSON",data)
  //       })
  //       .catch(function (err) {
  //         console.log('Error: ', err);
  //       });
  //   } else {
  //     // console.log('ExplainerPage:', itemJson.dataFile);
  //     setItemJson(itemJsonFile);
  //   }
  // }, [itemJsonFile]);
  useEffect(() => {
    console.log('Test');
    const url = 'https://6lkh03vsyg.execute-api.us-east-1.amazonaws.com/Test/page/';
    if (!itemJsonFile) {
      fetch(process.env.PUBLIC_URL + '/pageId.json?v=' + Date.now())
        .then((response) => response.json())
        .then((page) => {
          fetch(url + page.id + '?v=' + Date.now())
            .then((response) => response.json())
            .then((data) => {
              console.log('DATA:', data.data.data.getPage);
              const page = data.data.data.getPage;
              document.title = page.title
              page.slides = page?.slides?.items?.sort((a, b) => {
                return a.pos > b.pos ? 1 : a.pos < b.pos ? -1 : 0;
              });
              page.slides.forEach((slide, i) => {
                slide.cards = slide?.cards?.items?.sort((a, b) => {
                  return a.pos > b.pos ? 1 : a.pos < b.pos ? -1 : 0;
                });
                slide.cards.forEach((card) => {
                  card.style = card.style ? JSON.parse(card.style) : [];
                });
              });

              console.log('TESTITEMJSON', page);
              setItemJson(page);
            });
        })
        .catch(function (err) {
          console.log("Error: ", err);
        });
    } else {
      // console.log('ExplainerPage:', itemJson.dataFile);
      setItemJson(itemJsonFile);
    }
  }, [itemJsonFile]);
  useEffect(() => {
    console.log("ITEMJSON:", itemJson);
    if (itemJson?.fonts) {
      var new_font = new FontFace(itemJson.fonts.families[0], "url(" + itemJson.fonts.urls[0] + ")");
      new_font
        .load()
        .then(function (loaded_face) {
          // use font here
          console.log("La fuente cargó");
          document.fonts.add(loaded_face);
        })
        .catch(function (error) {});
    }
  }, [itemJson]);

  const isSafarioIos = className(`left-side ${isSafari() || iOS() ? "scrollyTeller-lottie-height" : ""}`);

  const [componentNumberstate, setComponentNumberstate] = useState({
    inViewData: [],
    currentScrollState: { slide: -1, card: -1 },
  });
  const [refView, inView] = useInView();
  return (
    <>
      {itemJson?.header ? (
        <div ref={refView}>
          <Header header={itemJson?.header} fonts={itemJson?.fonts} />
        </div>
      ) : null}
      <div style={{ position: "relative" }}>
        <Dots
          isHeader={inView}
          setComponentNumberstate={setComponentNumberstate}
          componentNumberstate={componentNumberstate}
          slides={itemJson.slides}
        />
        <div ref={ref} className="Scrollyteller">
          <section className="Scrollyteller__section">
            <div className="graphic">
              {itemJson?.slides?.length > 0
                ? itemJson.slides.map((left, i) => {
                    switch (left.type) {
                      case 'video':
                        return (
                          <Videojs
                            width={width}
                            key={i}
                            src={componentNumberstate.inViewData?.isView === i ? left.data : left.data}
                            placeholder={left.placeholder}
                            isVisible={componentNumberstate.inViewData?.isView === i}
                            shouldPreload={componentNumberstate.inViewData?.isView === i - 1}
                          />
                        );
                      case "text":
                        return (
                          <div
                            className="left-side text video"
                            key={i}
                            style={{
                              display: componentNumberstate.inViewData?.isView === i ? "flex" : "none",
                            }}
                          ></div>
                        );

                      case 'animation2D':
                        return (
                          <div
                            className={isSafarioIos}
                            style={{
                              display: componentNumberstate.inViewData?.isView === i ? "flex" : "none",
                              width: "100%",
                              transformOrigin: "0px 0px 0px",
                            }}
                            id={`canvascontainer${i}`}
                            key={i}
                          >
                            {
                              <LottiePlayer
                                className="left-side"
                                id={`lottie${i}`}
                                mode="seek"
                                src={left.data}
                                key={i}
                                renderer="canvas"
                                frames={left.frames}
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
              {itemJson?.slides?.length > 0 ? (
                itemJson.slides.map((narr, i) => (
                  <WaypointCard
                    key={i}
                    setComponentNumberstate={setComponentNumberstate}
                    componentNumberstate={componentNumberstate}
                    i={i}
                    text={narr?.cards?.map((card) => card.description)}
                    styles={narr?.cards?.map((card) => card.style)}
                    isText={narr.type === 'text'}
                    isFirst={i === 0}
                    isLast={i === itemJson.slides.length - 1}
                    background={itemJson.background}
                  />
                ))
              ) : (
                <WaypointCard
                  key={0}
                  setComponentNumberstate={setComponentNumberstate}
                  componentNumberstate={componentNumberstate}
                  i={0}
                  text={["Loading"]}
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
