import React, { useEffect, useState } from 'react';
import Explainerpage from './Explainerpage';
import '../assets/styles/components/Editor.css';
const Editor = () => {
  const [itemJson, setItemJson] = useState({ data: [] });
  const [item, setItem] = useState([]);
  const [description, setDescription] = useState({});
  const [attribName, setattribName] = useState('');
  // useEffect(() => {
  //       setItem(itemJson?.length > 0?itemJson[itemJson.length-1]:[])
  //       console.log("Prueba",itemJson)
  // }, [itemJson,setItem])
  useEffect(() => {
    console.log(item)
    if (item) AddItem(item);
  }, [item]);
  // useEffect(() => {
  //   console.log(itemJson)
  //   if(itemJson?.length>0){
  //     const auxItemJson = itemJson;
  //     let auxItem =auxItemJson[auxItemJson.length-1][0];
  //     console.log("Atrib:",attribName)
  //     if(attribName && description[attribName] !==auxItem[attribName]){
  //       console.log("descripción",description)
  //       auxItem = {
  //         ...auxItem,
  //         ...description};
  //         auxItemJson[auxItemJson.length-1][0] = auxItem

  //       setItemJson([...auxItemJson])
  //     }
  //   }
  // }, [description,itemJson,attribName])
  const AddItem = (Item) => {
    if (Item && Item.length>0) {
      const data = itemJson.data;
      const pos = data.findIndex((x) => x[0]?.slide === Item[0].slide);
      let subPos;
      console.log('POS:', pos, data, Item);
      if (pos < 0) data.push([...Item]);
      else {
        console.log(Item[pos])
        console.log('DATA[POS]:', pos, data[pos]);
        data[pos] = Item
      }
      console.log('DATA[POS]:', pos, data[pos]);
      if (
        !item ||
        item[0]?.slide !== Item[0]?.slide ||
        (subPos !== undefined && subPos !== null && item[subPos]?.card !== Item[subPos]?.card)
      ) {
        if (pos < 0) {
          setItem({ ...data[0] });
        } else setItem({ ...data[pos] });
      }
      setItemJson({ ...itemJson, data:data });
    }
  };
  const handleDescriptionbchange = (event,i) => {
    console.log(i)
    const subItem = item;
    subItem[i] = {...item[i], 
      [event.target.name]: event.target.value,
    }
    setItem([

      ...subItem,
    ]
    );
    //setattribName(event.target.name);
  };
  const handleAdd = (i, type) => {
    setattribName('');
    setDescription({});
    const miniItem = {
      slide: i,
      card: '1',
      slideType: type,
      description: '' /*'Samurai Salmon Sashimi Salad'*/,
      descriptionType: '',
      data: '' /*'https://explainerpage-assets.s3.amazonaws.com/salmonvideos/00topfull.mp4'*/,
      frames: '',
      graphChange: '',
      static: '',
    };
    if (type === 'video' || type === '2d' || type === 'text') setItem([miniItem]);
  };
  return (
    <div className="Editor">
      <div className="">
        <Explainerpage itemJsonFile={itemJson} />
      </div>
      <div className="graphic">
        Editor
        <button onClick={() => handleAdd(itemJson.data.length, 'video')}>Add Video</button>
        <button onClick={() => handleAdd(itemJson.data.length, '2d')}>Add Animation</button>
        <button onClick={() => handleAdd(itemJson.data.length, 'text')}>Add Text</button>
        <div>
          {itemJson?.data?.length > 0 ? (
            itemJson.data.map((left, i) => {
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
          {item && item.length>0 ? (
            <div>
              <div>{item[0].slideType}</div>
              {item[0].slideType === 'video' || item[0].slideType === '2d' ? (
                <input placeholder="url" onChange={(event)=>handleDescriptionbchange(event,item[0].card-1)} name="data" value={item[0].data ? item[0].data : ''}></input>
              ) : null}
              {item[0].slideType === '2d' ? (
                <input
                  placeholder="frames"
                  onChange={(event)=>handleDescriptionbchange(event,item[0].card-1)}
                  name="frames"
                  value={item[0].frames ? item[0].frames : ''}
                ></input>
              ) : null}
              <input
                placeholder="description"
                onChange={(event)=>handleDescriptionbchange(event,item[0].card-1)}
                name="description"
                value={item[0].description ? item[0].description : ''}
              ></input>
              <button onClick={() => handleAdd(itemJson.data.length, 'video')}>Add Video</button>
            </div>
          ) : (
            <div>Vacio</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Editor;
