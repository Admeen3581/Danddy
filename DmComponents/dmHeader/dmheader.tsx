import React from 'react';
import './dmheader.css';
import Link from 'next/link';

const DMHeader = () => {
  return (
    <div className="dmhome-section">
       <div className="headerBox">
       <div className="dmmenu-container">
          <button className="dmmenu-button">☰</button>
          <div className="dmmenu-content">
            <ul>
              <li><Link href="/combat">Combat</Link></li>
              <li><Link href="/stats">Stats</Link></li>
              <li><Link href="/inventory">Inventory</Link></li>
            </ul>
          </div>
        </div>

          <h1>DM HOME PAGE</h1>
       </div>
    </div>
  );
};

export default DMHeader;
