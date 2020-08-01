import React from 'react';

import terms from '../../terms'
import './infoBar.css';

const {close} = terms.infoBar
const InfoBar = ({room}) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/">{close}</a>
    </div>
  </div>
);

export default InfoBar;