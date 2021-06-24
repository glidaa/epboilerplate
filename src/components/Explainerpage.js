import React, { useEffect, useState } from 'react';
import { iOS, isSafari } from './iosSupport';
import className from 'classnames';
import { useResizeDetector } from 'react-resize-detector/build/withPolyfill';
import { useInView } from 'react-intersection-observer';

import LottiePlayer from "./LottiePlayer";
import WaypointCard from "./WaypointCard";

import "./Explainerpage.css";
//import Video from './Video-React-player';
import Videojs from "./Videojs";
import Viewer3D from './Viewer3D'
import Dots from "./Dots";
import Image from './Image'
import Code from './Code'

import classNames from 'classnames';
//import VideoDash from './VideoDash'
var  WebFont  =  require('webfontloader');

const Explainerpage = (props) => {
  const { width, ref } = useResizeDetector();
  const { itemJsonFile } = props;
  const [itemJson, setItemJson] = useState({ slides: [] });
  //DON'T DELETE
  // useEffect(() => {
  //   console.log('Test');
  //   if (!itemJsonFile) {
  //     fetch(process.env.PUBLIC_URL + '/items.json?v=' + Date.now())
  //       .then((response) => response.json())
  //       .then((data) => {
  //         Test
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
    const url = 'https://vorc7ohl9f.execute-api.us-east-1.amazonaws.com/newmain/page/';
    if (!itemJsonFile) {
      fetch(process.env.PUBLIC_URL + '/pageId.json?v=' + Date.now())
        .then((response) => response.json())
        .then((page) => {
          fetch(url + page.id + '?v=' + Date.now())
            .then((response) => response.json())
            .then((data) => {
              console.log('DATA:', data.data.data.getPage);
              if(!data.data.data.getPage) return
              let page = data.data.data.getPage;
              document.title = page.title
              page = page
            ? { ...page, slides: [...page?.slides?.items] }
            : { ...itemJson };
              page.slides = page?.slides?.sort((a, b) => {
                return a.pos > b.pos ? 1 : a.pos < b.pos ? -1 : 0;
              });
              if (page.slides) {
              page.slides.forEach((slide, i) => {
                if (slide?.cards?.items) slide.cards = [...slide?.cards?.items];
                else if (slide.cards) slide.cards = [...slide?.cards];
                else slide.cards = [];
                slide.cards = slide?.cards?.sort((a, b) => {
                    return a.pos > b.pos ? 1 : a.pos < b.pos ? -1 : 0;
                });
                slide.pageStyles = convertStringToJson(slide.pageStyles);
                if (slide.cards) {
                    slide.cards.forEach((card) => {
                      card.style = convertStringToJson(card.style)
                    });
                }
              });
            }
                page.fonts = convertStringToJson(page.fonts)
                page.styles = convertStringToJson(page.styles)
                page.cardStyles = convertStringToJson(page.cardStyles)
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
      // (function(d) {
      //   var wf = d.createElement('script'), s = d.scripts[0];
      //   wf.src = itemJson.fonts.google.urls[0];
      //   wf.async = true;
      //   wf.type="text/css";
      //   s.parentNode.insertBefore(wf, s);
      // })(document);
      try {

        WebFont.load ( {
          google : {
            families: itemJson.fonts.google.families
          }
      } );
        } catch (error) {

        }

      // console.log(WebFontConfig)
      console.log("FONT")
    }
  }, [itemJson]);
  const convertStringToJson = (input)=>{
    var convert = null
    try {
      convert = input?(typeof input==='object'?input:JSON.parse(input)):null
      if(convert)
      Object.keys(convert).forEach(value=>{
        if(convert[value] === undefined) delete convert[value]
      })
      console.log("convertStringToJson:",convert)
    } catch (error) {
    }
    return convert
  }
  const isSafarioIos = className(`left-side ${isSafari() || iOS() ? "scrollyTeller-lottie-height" : ""}`);

  const [componentNumberstate, setComponentNumberstate] = useState({
    inViewData: [],
    currentScrollState: { slide: -1, card: -1 },
  });
  const [refView, inView] = useInView();
  useEffect(() => {
    if(inView){
      setComponentNumberstate(
        {
          inViewData: {isView:-1},
    currentScrollState: { slide: -1, card: -1 },
        }
      )
    }

  }, [inView])
  return (
    <>

      <div style={{ position: "relative" }} ref={ref}>
        <Dots
          isHeader={inView}
          setComponentNumberstate={setComponentNumberstate}
          componentNumberstate={componentNumberstate}
          slides={itemJson.slides}
        />
        <div
          className="Scrollyteller"
          style={
            Object.assign(
                {},
                itemJson?.styles,
                componentNumberstate.inViewData?.isView >= 0 &&
                itemJson?.slides[
                    componentNumberstate.inViewData?.isView
                ]?.pageStyles,
            )
        }
      >
          <section className="Scrollyteller__section">
            <div className="graphic" style={{ width: `${width}px` }}>
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
                      case 'image':
                        return (
                          <div
                          className={className(
                              'left-side',
                              { SlideLeft: left.Position === 'left' },
                              { SlideMedium: left.Position === 'medium' },
                              { SlideRight: left.Position === 'right' }
                            )}
                            style={{
                              display: componentNumberstate.inViewData?.isView === i ? "flex" : "none",
                            }}
                            id={`image${i}`}
                            key={i}
                          >
                          <Image
                            width={width}
                            key={i}
                            src={left.data}
                            isVisible={componentNumberstate.inViewData?.isView === i}
                          />
                          </div>
                        );
                      case "text":
                        return (
                          <div
                          className={className(
                              'left-side',
                              'text', 'video',
                              )}
                            key={i}
                            style={{
                              display: componentNumberstate.inViewData?.isView === i ? "flex" : "none",
                            }}
                          ></div>
                        );

                    case 'animation2D':
                      return (
                        <div
                          className={className(
                          'left-side',
                          {'scrollyTeller-lottie-height':isSafari() || iOS() },
                          { SlideLeft: left.Position === 'left' || !left.Position },
                          { SlideMedium: left.Position === 'medium' },
                          { SlideRight: left.Position === 'right' },
                          { Fullscreen: left.Position === 'fullscreen' },
                          )}
                          style={{
                            display: componentNumberstate.inViewData?.isView === i ? "flex" : "none",
                            transformOrigin: "0px 0px 0px",
                          }}
                          id={`canvascontainer${i}`}
                          key={i}
                        >
                            <LottiePlayer
                              className="left-side"
                              id={`lottie${i}`}
                              mode="seek"
                              src={left.data}
                              i={i}
                              key={i}
                              renderer="canvas"
                              frames={left.frames}
                              Display = {componentNumberstate.inViewData?.isView === i}
                            />
                        </div>
                      );
                      case "animation3D":
                        return (
                            <div
                                className={isSafarioIos}
                                style={{
                                    display:
                                        componentNumberstate
                                            .inViewData
                                            ?.isView === i
                                            ? "flex"
                                            : "none",
                                    width: "100%",
                                    transformOrigin:
                                        "0px 0px 0px"
                                }}
                                key={i}
                            >
                                <Viewer3D data={left.data} background={left.placeholder}></Viewer3D>
                            </div>
                        );
                      case "code":
                        return (
                          <div
                              className={isSafarioIos}
                              style={{
                                  display:
                                      componentNumberstate
                                          .inViewData
                                          ?.isView === i
                                          ? "flex"
                                          : "none",
                                  width: "100%",
                                  transformOrigin:
                                      "0px 0px 0px"
                              }}
                              key={i}
                          >
                              <Code codeUrl={left.data} placeholder={left.placeholder}/>
                          </div>
                        )
                    default:
                      return null;
                  }
                })
                : null}
            </div>
            <div className={classNames('scroller', {'scrollerWithHeader':itemJson?.header})} id="scroller">
              {itemJson?.slides?.length > 0 ? (
                itemJson.slides.map((narr, i) => (
                  <WaypointCard
                    key={i}
                    setComponentNumberstate={setComponentNumberstate}
                    componentNumberstate={componentNumberstate}
                    i={i}
                    text={narr?.cards?.map((card) => card.description)}
                    styles={narr?.cards?.map(card => Object.assign(
                      {},
                      itemJson.cardStyles,
                      card.style,
                  ))}
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