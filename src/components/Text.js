import React from 'react'

const Text = (props) =>{
    const {text} = props
    return (
        <div className="video__div">
        <div style={{color:'white'}}>{text}</div>
        </div>
    )
}

export default Text;