import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { iOS, isSafari } from "./iosSupport";
import { create } from "@lottiefiles/lottie-interactivity";
import className from "classnames";

import LottiePlayer from "./LottiePlayer";
import WaypointCard from "./WaypointCard";
import VideoBackground from "./VideoBackground";
import RecordPlayer from "./RecordPlayer";

import "../assets/styles/components/Scrollyteller.css";

const Scrollyteller = () => {
  const [itemJson, setItemJson] = useState([]);
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/items.json?v=" + Date.now())
      .then((response) => response.json())
      .then((data) => {
        setItemJson(data);
      })
      .catch(function (err) {
        console.log("Error: ", err);
      });
  }, []);
  const isSafarioIos = className(`left-side ${isSafari() || iOS() ? "scrollyTeller-lottie-height" : ""}`);

  const [componentNumberstate, setComponentNumberstate] = useState([]);

  useEffect(() => {
    const lotties = itemJson ? [...itemJson].filter((e) => e[0].frames !== "") : null;

    document.querySelectorAll("lottie-player").forEach((lottie, i) => {
      lottie.addEventListener("load", function (e) {
        create({
          mode: "scroll",
          autoplay: false,
          player: `#lottie${lottie.id.split("lottie")[1]}`,
          container: `#step${Math.trunc(lottie.id.split("lottie")[1])}`,
          actions: [
            {
              visibility: [0, 0.8],
              type: "seek",
              frames: [0, lotties[i][0].frames],
            },
          ],
        });
      });
      lottie.addEventListener("frame", function (e) {
        const canvasdiv = lottie.shadowRoot.querySelectorAll(".main > .animation");
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
          {itemJson && itemJson.length > 0
            ? itemJson.map((left, i) => {
                switch (left[0].slideType) {
                  case "video":
                    return (
                      <div
                        className="left-side video"
                        key={i}
                        style={{
                          display: componentNumberstate[i] ? "flex" : "none",
                        }}
                      >
                        <VideoBackground src={left[0].data} />
                      </div>
                    );
                  case "2d":
                    return (
                      <div
                        className={isSafarioIos}
                        style={{
                          display: componentNumberstate[i] ? "flex" : "none",
                          width: "100%",
                          transformOrigin: "0px 0px 0px",
                        }}
                        id={`canvascontainer${i}`}
                        key={i}
                      >
                        <LottiePlayer
                          className="left-side"
                          id={`lottie${i}`}
                          mode="seek"
                          src={left[0].data}
                          key={i}
                          renderer="canvas"
                        />
                      </div>
                    );
                  default:
                    return null;
                }
              })
            : null}
        </div>
        <div className="scroller" id="scroller">
          {itemJson?.length > 0 ? (
            itemJson.map((narr, i) => (
              <div
                className={className(
                  "w-card-maindiv",
                  { "w-card-maindiv-first": i === 0 },
                  { "w-card-maindiv-last": i === itemJson.length - 1 }
                )}
                id={`step${i}`}
                key={i}
              >
                <WaypointCard
                  setComponentNumberstate={setComponentNumberstate}
                  componentNumberstate={componentNumberstate}
                  i={i}
                  text={narr?.map((card) => card.description)}
                />
              </div>
            ))
          ) : (
            <div
              className={className("w-card-maindiv", { "w-card-maindiv-first": true }, { "w-card-maindiv-last": true })}
              id={`step0`}
              key={0}
            >
              <WaypointCard
                setComponentNumberstate={setComponentNumberstate}
                componentNumberstate={componentNumberstate}
                i={0}
                text={["Loading.."]}
              />
            </div>
          )}
        </div>
      </section>
      <RecordPlayer />
    </div>
  );
};

export default Scrollyteller;
