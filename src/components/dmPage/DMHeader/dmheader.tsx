import React from 'react';
import './dmheader.css';
import Link from 'next/link';
import { MessagePopUp } from "@/components/messaging/messageDrawer";
import {DirectMessagePopup} from "@/components/messaging/directMessagePopup";

const DMHeader = () => {
  return (
    <div className="dm-sect">
       <div className="headerBox">
       <div className="dmmenu-container">
          <button className="dmmenu-button">☰</button>
          <div className="dmmenu-content">
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/combat">Characters</Link></li>
                <li><Link href="/NPC">NPC</Link></li>
                <li><Link href="/encountercreation">Enemy</Link></li>
                {<!--Do we have an enemy screen? I do not think we have one unless it is named something weird?
                because the enemy screen is blank so like... whats the game plan my dudes...-->}
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
