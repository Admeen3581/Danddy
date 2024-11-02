"use client"

import './dm.css';
import React, { useEffect, useRef } from 'react';
import DMNotes from '../../../DmComponents/DMNotes/dmnotes';
import { createRoom, deleteDatabaseRoute, generateRoomCode, readDatabaseRoute, updateDatabaseRoute } from '@/utils/httpRequester';
import useLocalStore from '@/utils/store';
import DMHeader from '../../../DmComponents/DMHeader/dmheader';
import DMActivePlayers from '../../../DmComponents/DMActivePlayers/dmactive';
import MapViewer from '../../../DmComponents/MapViewer';
import { MessageRecievePopUp } from "@/components/messageRecievedPopUp";

const DMHome = () => {
  const isRoomCreated = useRef(false)
  const {roomId, setRoomId} = useLocalStore()

  useEffect(() => {
    if(!isRoomCreated.current){
      setRoomId("temp")
      const roomId = generateRoomCode()
      const roomJson = {
        "campaign_id": "campaign_id_1",
        "user_id": "dm",
        "participants": ["player1"],
        "combat_log": [
          "Thorn casts Fireball on Garrosh",
          "Garrosh takes 18 damage",
          "Garrosh swings Greatsword at Thorn",
          "Thorn dodges the attack"
        ],
        "start_time": "2024-09-28T19:00:00Z",
        "end_time": "2024-09-28T20:15:00Z"
      };

      createRoom(roomId, roomJson)
      setRoomId(roomId);
      isRoomCreated.current = true;
    }
  }, []);

  return (
    <>
      <DMHeader />
      <div className="containerDM">
        <DMActivePlayers />
        <MapViewer />
      </div>
      <DMNotes />
      <MessageRecievePopUp />
    </>
  );
};

export default DMHome;
