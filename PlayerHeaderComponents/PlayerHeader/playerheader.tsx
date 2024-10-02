import React from 'react';
import './playerheader.css';
import Link from 'next/link';

const PlayerHeader = () => {
  return (
    <div className="PAHome-section">
       <div className="headerBox">
          <h1>PLAYER HOME PAGE</h1>
          <Link href="/combat" className="button">
            Combat
          </Link>
       </div>
    </div>
  );
};

export default PlayerHeader;
