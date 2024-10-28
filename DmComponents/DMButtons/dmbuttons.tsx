import './dmbuttons.css';
import Link from 'next/link';
import {MessagePopUp} from "@/components/messageDrawer";
import messageButtonState from "@/lib/messageButtonState";
import {DirectMessagePopup} from "@/components/directMessagePopup";


const DMButtons = () => {

    //'MessagePopUp' & 'DirectMessagePopUp' have their own button trigger

  return (
    <div className="dmhome-section">
       <div className="ButtonsBox">
          <h1>Buttons:</h1>
          <div className="button-container">
              <Link href="/chars" className="button"> {}
                  Characters
              </Link>
              <button className='button'>NPC</button>
              <button className='button'>Enemy</button>
              <MessagePopUp/>
              <DirectMessagePopup/>
          </div>
       </div>
    </div>
  );
};

export default DMButtons;
