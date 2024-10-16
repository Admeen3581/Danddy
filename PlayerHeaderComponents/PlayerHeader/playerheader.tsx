import React from 'react';
import './playerheader.css';
import Link from 'next/link';

const PlayerHeader = () => {
  return (
    <div className="PAHome-section">
      <div className="headerBox">
        {/* The sliding menu on top of the header */}
        <div className="menu-container">
          <button className="menu-button">☰</button>
          <div className="menu-content">
            <ul>
              <li><Link href="/combat">Combat</Link></li>
              <li><Link href="/stats">Stats</Link></li>
              <li><Link href="/inventory">Inventory</Link></li>
            </ul>
          </div>
        </div>

        {/* Player home page title */}
        <h1>PLAYER HOME PAGE</h1>
      </div>
    </div>
  );
};

export default PlayerHeader;
