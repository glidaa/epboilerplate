import "./App.css";
import Fake3dContainer from "./Fake3dContainer";

import imageUrlTopQantas from "./assets/topqantas.jpg";
import imageDepthMapUrlTopQantas from "./assets/topqantas-depthmap.png";

import imageUrlTwoPeople from "./assets/two-people.png";
import imageDepthMapUrlTwoPeople from "./assets/two-people-depthmap.png";

function App() {
  return (
    <div className="App">
      <Fake3dContainer
        imageUrl={imageUrlTopQantas}
        imageDepthMapUrl={imageDepthMapUrlTopQantas}
        width={600} 
        height={400}
      />
      <Fake3dContainer
        imageUrl={imageUrlTwoPeople}
        imageDepthMapUrl={imageDepthMapUrlTwoPeople}
        width={600}
        height={400}
      />
    </div>
  );
}

export default App;
