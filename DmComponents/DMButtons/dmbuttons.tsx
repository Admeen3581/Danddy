import './dmbuttons.css';
import Link from 'next/link';
import {MessagePopUp} from "@/components/messageDrawer";
import {messageButtonState} from "@/lib/messageButtonState";

const DMButtons = () => {

    const [enabled, setEnabled] = messageButtonState();

    const openMessageButtonState = () => {
        setEnabled(true);
    }

    const closeMessageButtonState = () => {
        setEnabled(false);
    }

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
              <button onClick={openMessageButtonState}>Direct Message</button>
              <!--implement shadCn component here-->
          </div>
       </div>
    </div>
  );
};

export default DMButtons;
