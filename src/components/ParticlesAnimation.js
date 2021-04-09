import React, { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Helmet } from "react-helmet";
import { useLoader, extend, useThree } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import brain from '../assets/brain-simple-mesh.glb';
// import { PerspectiveCamera } from '@react-three/drei/PerspectiveCamera'
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei/OrbitControls";
import { MOUSE } from "three";

const numParticles = 2500;

extend({ OrbitControls });

const Brain = (props) => {
  const gltf = useLoader(GLTFLoader, brain);
  
  const mat = new THREE.ShaderMaterial({  })
  // return null;
  return <primitive object={gltf.scene} material={mat} position={[0, -550, -1800]} scale={[900,900,900]} rotation={[0, 90, 0]}/>;
};

const Scene = () => {
  
  return (
    <>
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} />
        <spotLight intensity={0.8} position={[300, 300, 400]} />
       
        <Brain />
        
      </Suspense>
    </>
  );
};

const Map = (props) => {
  const nodes = useRef([]);
  const scale = useRef([]);
  const waves = useRef();

  const { positions, scales } = useMemo(() => {
    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);

    let i = 0,
      j = 0;

    for (var ix = 0; ix < 50; ix++) {
      for (var iy = 0; iy < 50; iy++) {
        positions[i] = ix * 100 - (50 * 100) / 2; // x
        positions[i + 1] = 0; // y
        positions[i + 2] = iy * 100 - (50 * 100) / 2; // z

        scales[j] = 1;

        i += 3;
        j++;
      }
    }
    return { positions, scales };
  }, []);
  nodes.current = positions;
  scale.current = scales;

  useFrame(({ clock }) => {
    const positions = waves.current.__objects[0].attributes.position.array;
    const scales = waves.current.__objects[0].attributes.scale.array;

    let i = 0,
      j = 0;

    for (var ix = 0; ix < 50; ix++) {
      for (var iy = 0; iy < 50; iy++) {
        positions[i + 1] =
          Math.sin((ix + clock.elapsedTime) * 0.3) * 50 +
          Math.sin((iy + clock.elapsedTime) * 0.5) * 50;

        scales[j] =
          (Math.sin((ix + clock.elapsedTime) * 0.3) + 1) * 8 +
          (Math.sin((iy + clock.elapsedTime) * 0.5) + 1) * 8;

        i += 3;
        j++;
      }
    }
    waves.current.__objects[0].attributes.position.needsUpdate = true;
    waves.current.__objects[0].attributes.scale.needsUpdate = true;
  });

  return (
    <points {...props} ref={waves}>
      <bufferGeometry attach={"geometry"}>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          array={nodes.current}
          count={nodes.current.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={["attributes", "scale"]}
          array={scale.current}
          count={scale.current.length}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        attach="material"
        args={[
          {
            uniforms: {
              color: { value: new THREE.Color("#c3c8d6") },
            },
            vertexShader: document.getElementById("vertexshader")?.textContent,
            fragmentShader: document.getElementById("fragmentshader")?.textContent,
          },
        ]}
      />
    </points>
  );
};

var x;
var y;
let clientX = 0;
let clientY = 0;
function Dolly() {
  
  // This one makes the camera move in and out
  useFrame(({ clock, camera, mouse, viewport }) => {
    camera.position.z = 50 + Math.sin(clock.getElapsedTime())/2 * 10;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
     //console.log(document.Show.MouseX.value);
    camera.position.y = 100-(winScroll );
    camera.position.y -= clientY; 
    x = (mouse.x * viewport.width) / 10
    //y = (mouse.y * viewport.height) / 10
    camera.position.x = winScroll*2 ;
    camera.position.x+=clientX;
    camera.lookAt(0, 0, -1200);

    //camera.position.y = y
  });
  return null;
}

window.addEventListener('mousemove', (e) => {
  //console.log(e.clientX, e.clientY)
  clientX = e.clientX/2
  clientY = e.clientY/2
})

export default function ParticlesAnimation() {
  const [isHelmetLoad, setisHelmetLoad] = useState(false)
  useEffect(() => {
    console.log("Loaded Helmet")
    setisHelmetLoad(true)
  }, [])
  return (
    <>
      <Helmet>
        <script type="x-shader/x-vertex" id="vertexshader">
          {`attribute float scale;\nvoid main() {\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_PointSize = scale * ( 300.0 / - mvPosition.z );\n\tgl_Position = projectionMatrix * mvPosition;\n}`}
        </script>

        <script type="x-shader/x-fragment" id="fragmentshader">
          {`uniform vec3 color;\nvoid main() {\n\tif ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;\n\tgl_FragColor = vec4( color, 1.0 );\n}`}
        </script>
      </Helmet>
      <div style={{ color: "white" }} >
        <div
          className="particles"
          style={{
            height: "100vh",
            position: "relative",
            top: 0,
            width: "100%",
            left: "0",
            zIndex: "-1",
          }}
        >
          <Canvas
            style={{ background: "#1f2125" }}
            gl
            camera={{ position: [0, 0, 1000], far: 10000 }}
          >
           
            {isHelmetLoad?<Map />:null}
            <Scene />
            <Dolly />
          </Canvas>
        </div>
      </div>
      {/* <div className="brain" style={{height:'100vh', position:'relative', top:0, width:'97vw', left:'calc(3vw/2)', zIndex:'1'}}>
      <Canvas camera={{ position: [0, 0, 10] }}>

          
        </Canvas>
      </div> */}
    </>
  );
}
