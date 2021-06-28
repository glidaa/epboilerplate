import React, { useEffect } from 'react';
import { useState } from 'react';

function Menu({ data }) {

  const [styles, setStyles] = useState({});

  // To remove the automatic parent (paragraph) of ckeditor.
  const rmParent = code => code?.slice(3).slice(0, -4);

  useEffect(() => {
    let { height, background, fontColor, imageUrl } = data || {};
    setStyles({
      height, color: fontColor,
      background: background || imageUrl,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    });
  }, [data]);

  return (
    <div dangerouslySetInnerHTML={{ __html: rmParent(data?.code) }} style={styles}>

    </div>
  
  );
};

export default Menu;