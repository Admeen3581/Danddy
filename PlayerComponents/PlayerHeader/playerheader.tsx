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
              <li><Link href="/">Home</Link></li>
            </ul>
          </div>
        </div>

        <h1 className="glow-text">
          <span>PLAYER</span>
          <span> </span>
          <span>HOME</span>
          <span> </span>
          <span>PAGE</span>
        </h1>
      </div>
    </div>
  );
};

export default PlayerHeader;

//<button className='msgButton' onClick={openMessageButtonState}>Direct Message</button>
