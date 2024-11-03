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
  const {roomId, setRoomId, userId, setUserId} = useLocalStore()

  useEffect(() => {
    if(!isRoomCreated.current){
      setRoomId("temp")
      if (userId == null) {
        setUserId("guestId")
      }
      const roomId = generateRoomCode()
      const roomJson = {
        "campaign_id": "campaign_id_1",
        "user_id": userId,
        "participants": [""],
        "combat_log": [""],
        "start_time": new Date().toISOString(),
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
