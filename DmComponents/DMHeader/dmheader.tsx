import React from 'react';
import './dmheader.css';
import Link from 'next/link';
import { MessagePopUp } from "@/components/messageDrawer";
import {DirectMessagePopup} from "@/components/directMessagePopup";

const DMHeader = () => {
  return (
    <div className="dm-sect">
       <div className="headerBox">
       <div className="dmmenu-container">
          <button className="dmmenu-button">☰</button>
          <div className="dmmenu-content">
            <ul>
                <li><Link href="/combat">Characters</Link></li>
                <li><Link href="/NPC">NPC</Link></li>
                <li><Link href="/enemy">Enemy</Link></li>
                <MessagePopUp/>
                <DirectMessagePopup style={'button'}/>
            </ul>
          </div>
        </div>

        <h1 className="dmglow-text">
          <span>DM</span>
          <span> </span>
          <span>HOME</span>
          <span> </span>
          <span>PAGE</span>
        </h1>
       </div>
    </div>
  );
};

export default DMHeader;
