import React from 'react';

import './InfoBar.css';

import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';
const InfoBar=({room})=>(
    <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerCointainer">
      <a href="/"><img className="onlineIcon" src={closeIcon} alt="close"/></a>
    </div>
    </div>
)
export default InfoBar;