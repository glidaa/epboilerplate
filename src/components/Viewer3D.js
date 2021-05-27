import { OrbitControls } from "@react-three/drei/OrbitControls";
import { extend } from "react-three-fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import useInterval from "../PersonalHooks/useInterval";

extend({ OrbitControls });

const Viewer3D = props => {
    const { url, visible, Ref } = props;
    const [camera, setCamera] = useState(null);
    const [scripts, setScripts] = useState(null);
    const [scene, setScene] = useState(null);
    const [renderer, setRenderer] = useState(
        new THREE.WebGLRenderer({ antialias: true })
    );
    window.THREE = THREE
    const [frameId, setFrameId] = useState(0);
    const fromJSON = () => {

        var loader = new THREE.ObjectLoader();
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("3D:", data);
                setCamera(loader.parse(data.camera));

                // this.signals.cameraResetted.dispatch();

                //this.history.fromJSON( data.history );
                setScripts(data.scripts);

                loader.parse(data.scene, function(scene) {
                    setScene(scene);
                });
                // var player = new APP.Player();
                // //container.dom.appendChild( player.dom );
                // player.load( editor.toJSON() );
                // //player.setSize( container.dom.clientWidth, container.dom.clientHeight );
                // player.play();
            });
    };

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });

    const mount = useRef(null);
    const ref = useRef(null);
    // const [isAnimating, setAnimating] = useState(true)
    const controls = useRef(null);
    const renderScene = () => {
        renderer.render(scene, camera);
    };

    const handleResize = () => {
        if (renderer && camera) {
            renderer.setSize(ref.current.clientWidth, ref.current.clientHeight);
            camera.aspect = ref.current.clientWidth / ref.current.clientHeight;
            camera.updateProjectionMatrix();
            renderScene();
        }
    };
    const events = {
        init: [],
        start: [],
        stop: [],
        keydown: [],
        keyup: [],
        pointerdown: [],
        pointerup: [],
        pointermove: [],
        update: []
    };
    useEffect(() => {
        if (scripts && scene && visible) {
            console.log("scripts",scripts);
            var scriptWrapParams = "player,renderer,scene,camera";
            var scriptWrapResultObj = {};

            for (var eventKey in events) {
                scriptWrapParams += "," + eventKey;
                scriptWrapResultObj[eventKey] = eventKey;
            }
            var scriptWrapResult = JSON.stringify(scriptWrapResultObj).replace(
                /\"/g,
                ""
            );

            for (var uuid in scripts) {
                var object = scene.getObjectByProperty("uuid", uuid, true);

                if (object === undefined) {
                    console.warn("APP.Player: Script without object.", uuid);
                    continue;
                }

                var Auxscripts = scripts[uuid];

                for (var i = 0; i < Auxscripts.length; i++) {
                    var script = Auxscripts[i];

                    var functions = new Function(
                      scriptWrapParams,
                      script.source.replace('player','event.player') + "\nreturn " + scriptWrapResult + ";"
                    ).bind(object)(this, renderer, scene, camera);

                    for (var name in functions) {
                        if (functions[name] === undefined) continue;

                        if (events[name] === undefined) {
                            console.warn(
                                "APP.Player: Event type not supported (",
                                name,
                                ")"
                            );
                            continue;
                        }

                        events[name].push(functions[name].bind(object));
                    }
                }
            }
            console.log(events)
        }
    }, [scripts,scene,visible]);
    function dispatch( array, event ) {
			for ( var i = 0, l = array.length; i < l; i ++ ) {
        //console.log(array)
				array[ i ]( event );

			}

		}
    function onPointerMove( event ) {

			dispatch( events.pointermove, {...event,player:Ref} );

		}
    useEffect(() => {
        handleResize();
    }, [visible]);

    // const animate = () => {
    //   renderScene()
    //   setFrameId(window.requestAnimationFrame(animate))
    // }

    const start = () => {
        if (!frameId) {
            setFrameId(requestAnimationFrame(animate));
        }
    };

    const stop = () => {
        cancelAnimationFrame(frameId);
        setFrameId(null);
    };

    useEffect(() => {
        if (camera && scene && ref) {
            renderer.setClearColor("#fffff");
            mount.current.appendChild(renderer.domElement);
            window.addEventListener("resize", handleResize);
            //start()

            renderer.setSize(ref.current.clientWidth, ref.current.clientHeight);
            camera.aspect = ref.current.clientWidth / ref.current.clientHeight;
            controls.current = { start, stop };
            renderScene();
        }
    }, [camera, scene]);
    const distance = 5;
    const maxAngulo1 = 180;
    const maxAngulo2 = 180;
    let Angulo1 = 0;
    let Angulo2 = 0;
    let clientX = 5;
    let clientY = 0;
    let clientZ = 0;
    if (Ref.current)
      Ref.current.addEventListener('pointermove', onPointerMove)
    if (Ref.current)
        Ref.current.addEventListener("mousemove", e => {
            if (camera && scene && visible) {
                Angulo1 =
                    (e.offsetX * maxAngulo1) / ref.current.clientWidth + 180;
                Angulo2 =
                    (e.offsetY * maxAngulo2) / ref.current.clientHeight + 90;
                Angulo1 = Angulo1 ? Angulo1 : 0;
                Angulo2 = Angulo2 ? Angulo2 : 0;
                clientX =
                    distance *
                    Math.sin((Angulo1 * Math.PI) / 180) *
                    Math.cos((Angulo2 * Math.PI) / 180);
                clientY =
                    distance *
                    Math.sin((Angulo1 * Math.PI) / 180) *
                    Math.sin((Angulo2 * Math.PI) / 180);
                clientZ = distance * Math.cos((Angulo1 * Math.PI) / 180);

                // let clientHeight = ref.current.clientHeight
                // let clientWidth = ref.current.clientWidth
                // let posX = e.offsetX
                // let posY = e.offsetY
                // let posXMedio = posX - clientWidth/2
                // let posYMedio = posY - clientHeight/2
                //console.log(e.clientX, e.clientY)
                //5--->resultado%
                //clientX--->100%
                //resultado-->100%
                // clientX = posXMedio;
                // clientY = posYMedio;
                // clientX = 500/clientX
                // clientY = 500/clientY
            }
        });
    const [timeInterval, setTimeInterval] = useState(100);
    var time, startTime, prevTime;
    const animate = () => {
        if (camera && scene) {
            //camera.position.z = 50 + Math.sin(clock.getElapsedTime())/2 * 10;
            const winScroll = 0; //document.body.scrollTop || document.documentElement.scrollTop;
            //console.log(document.Show.MouseX.value);
            //console.log(camera.position, scene.position);
            //camera.position.y -= 1;
            //x = (mouse.x * viewport.width) / 10
            //y = (mouse.y * viewport.height) / 10
            // if(x)clientX = x;
            // if(y)clientY = y;
            // if(z) camera.position.z += -z - camera.position.z;

            time = time?time+500:500;
            //scene.children[0].material.uniforms.time.value = time / 500.0;
            try {

              dispatch( events.update, {objecto:scene.children[0], time: time, delta: time - prevTime } );

            } catch ( e ) {
              console.log(( e.message || e ))
              console.error( ( e.message || e ), ( e.stack || '' ) );

            }

            //renderer.render( scene, camera );

            prevTime = time;
            camera.position.x = clientX;
            camera.position.y = clientY;
            camera.position.z = clientZ;
            //        camera.position.x+=1;
            camera.lookAt(scene.position);
            renderScene();
            //console.log("Parámetros",clientX,clientY,clientZ,Angulo1,Angulo2)

            //setFrameId(window.requestAnimationFrame(animate))
            //camera.position.y = y
        }
    };
    useInterval(
        () => {
            animate();
        },
        visible ? timeInterval : null
    );
    useEffect(() => {
        fromJSON();
        return () => {
            stop();
            window.removeEventListener("resize", handleResize);
            if (mount.current && renderer?.domElement)
                mount.current.removeChild(renderer.domElement);
            if (geometry) geometry.dispose();
            if (material) material.dispose();
        };
    }, []);

    // useEffect(() => {
    //   if (isAnimating) {
    //       controls.current.start()
    //     } else {
    //     controls.current.stop()
    //   }
    // }, [isAnimating])

    return (
        <div
            ref={ref}
            className="vis"
            style={{ width: "100%", height: "100vh", position: "relative" }}
        >
            <div
                ref={mount}
                style={{ width: "100%", height: "100vh", position: "absolute" }}
            ></div>
        </div>
    );
};

export default Viewer3D;
