import React, { useEffect } from "react";
import * as PIXI from "pixi.js";

export default function Fake3dContainer({ imageUrl, imageDepthMapUrl, width, height }) {

    const containerClassName = `container-${imageUrl.split('/').pop().split('.')[0]}`;

  useEffect(() => {

    let containerElement = document.querySelector(`.${containerClassName}`)
    containerElement.style.width = `${window.screen.width}px`
    containerElement.style.height = `${height}px`

    let containerWidth = containerElement.offsetWidth
    let containerHeight = containerElement.offsetHeight


    let app = new PIXI.Application({
      width: containerWidth,
      height: containerHeight,
    });
    
    containerElement.appendChild(app.view);

    let img = new PIXI.Sprite.from(imageUrl);
    img.width = containerWidth;
    img.height = containerHeight;
    app.stage.addChild(img);

    var depthMap = new PIXI.Sprite.from(imageDepthMapUrl);
    depthMap.width = containerWidth;
    depthMap.height = containerHeight;
    app.stage.addChild(depthMap);

    var displacementFilter = new PIXI.filters.DisplacementFilter(depthMap);
    app.stage.filters = [displacementFilter];

    displacementFilter.scale.x = 1
    displacementFilter.scale.clientY = 1

    containerElement.onmousemove = function (e) {
      displacementFilter.scale.x = (containerWidth / 2 - e.clientX) / 20;
      displacementFilter.scale.clientY =
        (containerHeight / 2 - e.clientY) / 20;
    };
  }, []);

  return <div className={`${containerClassName} fake3d-container`}>

  </div>;
}
