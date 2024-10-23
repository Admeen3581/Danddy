import React from 'react';
import './dmheader.css';
import Link from 'next/link';
import { MessagePopUp } from "@/components/messageDrawer";

const DMHeader = () => {
  return (
    <div className="dmhome-section">
       <div className="headerBox">
       <div className="dmmenu-container">
          <button className="dmmenu-button">☰</button>
          <div className="dmmenu-content">
            <ul>
              <li><Link href="/combat">Characters</Link></li>
              <li><Link href="/stats">NPC</Link></li>
              <li><Link href="/inventory">Enemy</Link></li>
              <MessagePopUp/>
            </ul>
          </div>
        </div>

          <h1>DM HOME PAGE</h1>
       </div>
    </div>
  );
};

export default DMHeader;
