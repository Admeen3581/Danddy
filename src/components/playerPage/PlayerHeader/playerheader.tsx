import React from 'react';
import './playerheader.css';
import Link from 'next/link';
import { MessagePopUp } from "@/components/messaging/messageDrawer";
import { DirectMessagePopup } from "@/components/messaging/directMessagePopup";

const PlayerHeader = () => {
  return (
    <div className="player-sect">
      <div className="headerBox">
        <div className="menu-container">
          <button className="menu-button">☰</button>
          <div className="menu-content">
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/combat">Characters</Link></li>
              <li><Link href="/enemycombat">Combat</Link></li>
              <li><Link href="/encountercreation">Enemy</Link></li>
              <MessagePopUp />
              <DirectMessagePopup style={'button'} />
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
