import React from 'react'
import '../assets/styles/components/Text.css'

const Text = (props) =>{
    const {text} = props
    const setHTML = (data) => {
        data = Array.isArray(data)?data.filter(t=>(t!==',')):data;
        return { __html: data };
      };
    return (
        <div className="video__div Text-flex" >
        <div style={{color:'white'}} className="Text" dangerouslySetInnerHTML={setHTML(text)}></div>
        </div>
    )
}

export default Text;