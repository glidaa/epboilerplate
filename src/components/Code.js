import React, {useEffect, useRef} from 'react';
import * as GlobalTHREE from 'three'
import {OrbitControls as GlobalOrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const Code = ({codeUrl, placeholder}) => {
    const elementRef = useRef(null)

    useEffect(async () => {
        if(placeholder){
            const data = JSON.parse(placeholder)
            let files = {}
            await Promise.all(data.url.map(async (path) => {
                const res = await fetch(`https://explainerpage-code.s3.amazonaws.com/public/${path}`)
                const data = await res.blob()

                const filename = path.split('/').pop().replace(/\..+$/, '');

                files = {
                    ...files,
                    [filename]: data
                }
              }));

            if(codeUrl){
                const THREE = GlobalTHREE
                const OrbitControls = GlobalOrbitControls
                const element = elementRef.current
                fetch(`https://explainerpage-code.s3.amazonaws.com/public/${codeUrl}`)
                .then(res => res.text())
                .then(data => eval(data))
            }
        }
    },[])

    return (
        <div ref={elementRef} style={{width: "100%", height: "100%"}}></div>
    )
}

export default Code