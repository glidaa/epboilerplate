import Explainerpage from './components/Explainerpage';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Header from "./components/Header";

function App() {
  const [data, setData] = useState({
    header: {
      title: 'paredes'
    }, 
    fonts: 'fdfds'
  });
  const [refView, inView] = useInView();
  return(
    <>
    { data?.header ? ( //
      <div ref={refView}>
        <Header header={data?.header} fonts={data?.fonts} />
      </div>
    ) : null}
    <Explainerpage />
    </>
  )
  // return <Video width = {500}
  // key={0}
  // src={'https://myvodstreams-devenvi-output-ixgkd1fc.s3.amazonaws.com/salmonvideos/00topfull/00topfull.m3u8'}
  // visible={true}
  // display={true}/>;
}

export default App;
