import React from "react";
import "@lottiefiles/lottie-player";

const LottiePlayer = React.memo((props) => {
  console.log("url:",props?props.src:"");
  return (
    <>
      <lottie-player
        {...props}
        rendererSettings={{
          clearCanvas: true,
          resizeMode: 'center',
        }}
      ></lottie-player>
    </>
  );
});

export default LottiePlayer;
