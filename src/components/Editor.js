import React, { useEffect, useState } from 'react';
import Explainerpage from './Explainerpage';
import '../assets/styles/components/Editor.css';
const Editor = () => {
  const [itemJson, setItemJson] = useState([]);
  const [item, setItem] = useState({})

  useEffect(() => {
        setItem(itemJson?.length > 0?itemJson[itemJson.length-1]:[])
        console.log(item)
  }, [itemJson,setItem])
  useEffect(() => {
      console.log(item)
  }, [item])
  const handleVideoAdd = () => {
    const Video = [
      {
        slide: '1',
        card: '1',
        slideType: 'video',
        description: 'Samurai Salmon Sashimi Salad',
        descriptionType: '',
        data: 'https://explainerpage-assets.s3.amazonaws.com/salmonvideos/00topfull.mp4',
        frames: '69',
        graphChange: '',
        static: '',
      },
    ];
    setItemJson([...itemJson, Video]);
  };
  const handleAnimationAdd = () => {
    const Animation = [
      {
        slide: '2',
        card: '1',
        slideType: '2d',
        description:
          'The Samurai are one of the most recognised warrior classes in history. Few names conjure such distinct images in the mind. The armour, the sword and bow, the stoic honour and sense of duty, they paint the picture of the pop culture icons and the perfect warriors. But what did these perfect warriors eat? And what can we take away from their diets and apply to our own?',
        descriptionType: 'card',
        data: 'https://assets7.lottiefiles.com/private_files/lf30_k6oprjex.json',
        frames: '451',
        graphChange: '',
        static: '',
      },
    ];
    setItemJson([...itemJson, Animation]);
  };
  const handleTextAdd = () => {
    const Text = [
      {
        slide: '1',
        card: '2',
        slideType: 'text',
        description: 'Prep Time: 30 min Cook Time: 30 min',
        descriptionType: 'card',
        data: '',
        frames: '',
        graphChange: '',
        static: '',
      },
    ];
    setItemJson([...itemJson, Text]);
  };
  return (
    <div className="Editor">
      <div className="">
        <Explainerpage itemJsonFile={itemJson} />
      </div>
      <div className="graphic">
          Editor
          <button onClick={handleVideoAdd}>Add Video</button>
          <button onClick={handleAnimationAdd}>Add Animation</button>
          <button onClick={handleTextAdd}>Add Text</button>
          <div>
            {itemJson?.length > 0 ? (
              itemJson.map((left, i) => {
                return <div key={i}>{left[0].slideType}</div>;
              })
            ) : (
              <div>Vacio</div>
            )}
          </div>
        </div>
        <div className="graphic">
          Opciones
          
          <div>
            {item ?item[0]?.((it)=>{
                return<div>{it}</div>
            })
             : 
              <div>Vacio</div>
            }
          </div>
        </div>
    </div>
  );
};

export default Editor;
