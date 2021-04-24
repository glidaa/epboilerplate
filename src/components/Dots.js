import React from 'react';
import '../assets/styles/components/Dots.css';
import className from 'classnames';
import { Link } from 'react-scroll';

const Dots = (props) => {
  const { componentNumberstate, itemJson, isHeader } = props;

  const handleSetActive = (to) => {
    console.log(to);
  };
  return (
    <div className={className('Dots', { 'Dots-Absolute': isHeader })}>
      <div className="Dots-central">
        {itemJson?.length > 0
          ? itemJson?.map((item, i) => {
              return (
                <div key={i} className="Dots-central">
                  <Link
                    to={`Slide${i}.0`}
                    spy={true}
                    smooth={true}
                    offset={-200}
                    duration={500}
                    onSetActive={handleSetActive}
                    className={className('Dots-circle', { 'Dots-Active': componentNumberstate[i]?.isView })}
                  />
                  {item?.length > 1 && componentNumberstate[i]?.isView
                    ? item.map((subitem, j) => {
                        return (
                          <Link
                            key={j}
                            to={`Slide${i}.${j}`}
                            spy={true}
                            smooth={true}
                            offset={0}
                            duration={500}
                            onSetActive={handleSetActive}
                            className={className('Dots-circle', 'Dots-SubCircle', {
                              'Dots-Sub-Active': componentNumberstate[i]?.isSubView[j],
                            })}
                          />
                        );
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
