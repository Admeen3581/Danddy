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

        <h1>PLAYER HOME PAGE</h1>
      </div>
    </div>
  );
};

export default PlayerHeader;

//<button className='msgButton' onClick={openMessageButtonState}>Direct Message</button>
