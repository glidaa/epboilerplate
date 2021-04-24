import React from 'react';
import '../assets/styles/components/Dots.css';
import className from 'classnames';

const Dots = (props) => {
  const { componentNumberstate, itemJson, isHeader} = props;
  console.log(itemJson?.length);
  return (
    <div className={className("Dots", {"Dots-Absolute":isHeader})}  >
      <div className="Dots-central">
        {itemJson?.length > 0
          ? itemJson?.map((item, i) => {
              return (
                <div key={i} className="Dots-central">
                  
                  <div className={className('Dots-circle', { 'Dots-Active': componentNumberstate[i]?.isView })}></div>
                  {item?.length > 1 && componentNumberstate[i]?.isView
                    ? item.map((subitem, j) => {
                        return <div key={j} className={className('Dots-circle', 'Dots-SubCircle', { 'Dots-Sub-Active': componentNumberstate[i]?.isSubView[j] })} />;
                      })
                    : null}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Dots;
