/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { iOS, isSafari } from "./iosSupport";
import className from "classnames";
import { useResizeDetector } from "react-resize-detector/build/withPolyfill";
import { useInView } from "react-intersection-observer";
import { Element, scroller } from "react-scroll";

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
  const [itemJson, setItemJson] = useState([]);

  const [componentNumberstate, setComponentNumberstate] = useState([]);
  const [refView, inView] = useInView();

  useEffect(() => {
    if (!itemJsonFile) {
      fetch(process.env.PUBLIC_URL + "/items.json?v=" + Date.now())
        .then((response) => response.json())
        .then((data) => {
          setItemJson(data);
        })
        .catch(function (err) {
          console.log("Error: ", err);
        });
    } else {
      console.log("ExplainerPage:", itemJson.dataFile);
      setItemJson(itemJsonFile);
    }
  }, [itemJsonFile]);

  useEffect(() => {
    if (itemJson?.fonts) {
      var new_font = new FontFace(
        itemJson.fonts.families[0],
        "url(" + itemJson.fonts.urls[0] + ")"
      );
      new_font
        .load()
        .then(function (loaded_face) {
          // use font here
          document.fonts.add(loaded_face);
        })
        .catch(function (error) {});
    }
  }, [itemJson]);

  const isSafarioIos = className(
    `left-side ${isSafari() || iOS() ? "scrollyTeller-lottie-height" : ""}`
  );

  const isOnTransition = useRef(false);

  const nextSlide = (direction) => {
    let currentSlide = componentNumberstate.findIndex(
      (v, i) => v?.isView === true
    );
    if (currentSlide === -1) return null;
    let currentCard = componentNumberstate[currentSlide].isSubView.findIndex(
      (v) => v
    );

    if (direction === "up") {
      // scroll down
      if (currentCard === 0) {
        // single-subview section
        if (currentSlide - 1 < 0) {
          // last card
          return null;
        } else {
          // return last subview of next view
          return `Slide${currentSlide - 1}.${
            itemJson.data[currentSlide - 1].length - 1
          }`;
        }
      } else {
        // multi-subview section
        return `Slide${currentSlide}.${currentCard - 1}`;
      }
    } else {
      // scroll up
      if (currentCard === itemJson.data[currentSlide].length - 1) {
        // on last card
        if (currentSlide + 1 > itemJson.data.length - 1) {
          // last vard
          return null;
        } else {
          // return first subview of next view
          return `Slide${currentSlide + 1}.0`;
        }
      } else {
        // multi-subview section
        return `Slide${currentSlide}.${currentCard + 1}`;
      }
    }
  };

  const getOffset = (slide) => {
    let offsets = {
      "Slide2.0": 100,
      "Slide3.0": -20,
    };

    let offset = Object.entries(offsets).find((v) => v[0] === slide);
    if (offset) return offset[1];
    else return -200;
  };

  const scrollEvent = (e) => {
    if (!isOnTransition.current) {
      if (e.deltaY < 0) {
        // scroll up
        let nextSlideUp = nextSlide("up");
        if (nextSlideUp === null) return;

        isOnTransition.current = true;
        setTimeout(() => {
          isOnTransition.current = false;
        }, 1500);
        scroller.scrollTo(nextSlideUp, {
          duration: 1500,
          smooth: "easeInOutCubic",
          offset: getOffset(nextSlideUp),
          ignoreCancelEvents: true,
        });
      } else {
        // scroll down
        let nextSlideDown = nextSlide("down");
        if (nextSlideDown === null) return;

        isOnTransition.current = true;
        setTimeout(() => {
          isOnTransition.current = false;
        }, 1500);
        scroller.scrollTo(nextSlideDown, {
          duration: 1500,
          smooth: "easeInOutCubic",
          offset: getOffset(nextSlideDown),
          ignoreCancelEvents: true,
        });
      }
    } else {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    if (itemJson?.data) {
      document
      .querySelector("body")
      .addEventListener("wheel", scrollEvent, { passive: false });
    }
    
    return () => {
      document
        .querySelector("body")
        .removeEventListener("wheel", scrollEvent, { passive: false });
    };
  }, [componentNumberstate, itemJson, scrollEvent]);

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
          itemJson={itemJson.data}
        />
        <div ref={ref} className="Scrollyteller">
          <section className="main Scrollyteller__section">
            <div className="graphic">
              {itemJson?.data?.length > 0
                ? itemJson.data.map((left, i) => {
                    switch (left[0].slideType) {
                      case "video":
                        return (
                          <Videojs
                            width={width}
                            key={i}
                            src={
                              componentNumberstate[i]?.isView
                                ? left[0].data
                                : left[0].data
                            }
                            visible={componentNumberstate[i]?.isView}
                            display={componentNumberstate[i]?.isView}
                          />
                        );
                      case "text":
                        return (
                          <div
                            className="left-side text video"
                            key={i}
                            style={{
                              display: componentNumberstate[i]?.isView
                                ? "flex"
                                : "none",
                            }}
                          >
                            <div />
                          </div>
                        );

                      case "2d":
                        return (
                          <div
                            className={isSafarioIos}
                            style={{
                              display: componentNumberstate[i]?.isView
                                ? "flex"
                                : "none",
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
                    i={i}
                    text={narr?.map((card) => card.description)}
                    styles={narr?.map((card) => card.style)}
                    isText={narr[0].slideType === "text"}
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
