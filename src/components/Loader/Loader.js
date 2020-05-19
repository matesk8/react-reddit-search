import React from 'react';
import { ReactComponent as LoadingCircleSVG } from '../../assets/loader.svg';
import './Loader.scss';

function Loader() {
  return (
    <div className="loader">
      <LoadingCircleSVG />
    </div>
  );
}

export default Loader;
