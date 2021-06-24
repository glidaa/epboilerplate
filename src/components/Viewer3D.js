import React, {useEffect, useRef} from 'react'
import * as THREE from 'three'

const Viewer3D = (props) => {
    const {data, background} = props;

    const viewer3dRef = useRef(null)
    const clock = new THREE.Clock()
    clock.start()
    let Camera, animationConfig;

    useEffect(() => {
        let Scene;
        let jsonScene;
        if(data){
            jsonScene = JSON.parse(data)
            Scene = new THREE.ObjectLoader().parse( jsonScene.data )
        }else{
            Scene = new THREE.Scene();
        }
        const Renderer = new THREE.WebGLRenderer();
        const element = viewer3dRef.current
        if(element.firstElementChild){
            element.firstElementChild.remove()
        }

        if(background){
            Scene.background = background;
        } else{
            Scene.background = new THREE.Color("rgb(92, 92, 92)")
        }
        Camera = new THREE.PerspectiveCamera( 75,  window.innerWidth/window.innerHeight, 0.1, 1000 );

        if(jsonScene?.camera){
            Camera.far = jsonScene.camera.far
            Camera.focus = jsonScene.camera.focus
            Camera.fov = jsonScene.camera.fov
            Camera.near = jsonScene.camera.near
            Camera.zoom = jsonScene.camera.zoom

            Camera.position.x = jsonScene.camera.position.x
            Camera.position.y = jsonScene.camera.position.y
            Camera.position.z = jsonScene.camera.position.z

            Camera.rotation.order = jsonScene.camera.rotation._order
            Camera.rotation.x = jsonScene.camera.rotation._x
            Camera.rotation.y = jsonScene.camera.rotation._y
            Camera.rotation.z = jsonScene.camera.rotation._z

        } else{
            Camera.position.y = 0.5;
            Camera.position.z = 5;
        }

        if(jsonScene?.cameraAnimation){
            animationConfig = jsonScene.cameraAnimation
        }

        Renderer.setSize( window.innerWidth, window.innerHeight);
        element.appendChild( Renderer.domElement )

        function render() {
            window.requestAnimationFrame( render );
            Renderer.render( Scene, Camera );
        }

        const light = new THREE.AmbientLight( "rgb(255, 255, 255)" )
        Scene.add(light)

        window.addEventListener('resize', () => {
            Camera.aspect = window.innerWidth/window.innerHeight
            Camera.updateProjectionMatrix()
            Renderer.setSize( window.innerWidth, window.innerHeight);
            Renderer.render( Scene, Camera );
        })
        render()
        animation()
    },[data])

    function animation(){
        if(animationConfig?.active){
            Camera.position.x = (Math.sin(clock.getElapsedTime()) / 2) * animationConfig.distance;
            Camera.lookAt(animationConfig.x, animationConfig.y, animationConfig.z);
            window.requestAnimationFrame( animation );
        }

    }

    return(
        <div ref={viewer3dRef} style={{width: "100%"}}></div>
    )
}

export default Viewer3D;