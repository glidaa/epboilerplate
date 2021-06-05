import React, {useEffect, useRef} from 'react'
import * as THREE from 'three'

const Viewer3D = (props) => {
    const {data, background} = props;

    const viewer3dRef = useRef(null)

    useEffect(() => {
        console.log("3D Data", data)
        let Scene;
        if(data){
            const jsonScene = JSON.parse(data)
            Scene = new THREE.ObjectLoader().parse( jsonScene.data )
        }else{
            Scene = new THREE.Scene();
        }
        const Renderer = new THREE.WebGLRenderer();
        const element = viewer3dRef.current
        const viewerPanel = document.getElementById("editor-explainerpage");
        if(element.firstElementChild){
            element.firstElementChild.remove()
        }

        if(background){
            Scene.background = background;
        } else{
            Scene.background = new THREE.Color("rgb(92, 92, 92)")
        }
        const Camera =  new THREE.PerspectiveCamera( 75,  viewerPanel.offsetWidth/viewerPanel.offsetHeight, 0.1, 1000 );
        const Grid = new THREE.GridHelper(10,20)
            Scene.add(Grid)
        Camera.position.y = 0.5;
        Camera.position.z = 5;
        Renderer.setSize( viewerPanel.offsetWidth, viewerPanel.offsetHeight);
        element.appendChild( Renderer.domElement )

        function render() {
            window.requestAnimationFrame( render );
            Renderer.render( Scene, Camera );
        }

        const light = new THREE.AmbientLight( "rgb(255, 255, 255)" )
        Scene.add(light)

        window.addEventListener('resize', () => {
            Camera.aspect = viewerPanel.offsetWidth/viewerPanel.offsetHeight
            Camera.updateProjectionMatrix()
            Renderer.setSize( viewerPanel.offsetWidth, viewerPanel.offsetHeight);
            Renderer.render( Scene, Camera );
        })
        render()
    },[data])

    return(
        <div ref={viewer3dRef} style={{width: "100%"}}></div>
    )
}

export default Viewer3D;