import React from 'react';
import './playerheader.css';
import Link from 'next/link';
import {DirectMessagePopup} from "@/components/directMessagePopup";

const PlayerHeader = () => {

  return (
    <div className="PAHome-section">
      <div className="headerBox">
        <div className="menu-container">
          <button className="menu-button">☰</button>
          <div className="menu-content">
            <ul>
              <li><Link href="/combat">Combat</Link></li>
              <li><DirectMessagePopup style={'msgButton'}/></li>
            </ul>
          </div>
        </div>

        <h1 className="glow-text">
          <span>P</span>
          <span>L</span>
          <span>A</span>
          <span>Y</span>
          <span>E</span>
          <span>R</span>
          <span> </span>
          <span>H</span>
          <span>O</span>
          <span>M</span>
          <span>E</span>
          <span> </span>
          <span>P</span>
          <span>A</span>
          <span>G</span>
          <span>E</span>
        </h1>
      </div>
    </div>
  );
};

export default PlayerHeader;

//<button className='msgButton' onClick={openMessageButtonState}>Direct Message</button>
