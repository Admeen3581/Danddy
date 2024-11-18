"use client"

import './dm.css';
import React, { useEffect, useRef } from 'react';
import DMNotes from '../../components/dmPage/DMNotes/dmnotes';
import { createRoom, deleteDatabaseRoute, generateRoomCode, patchDatabaseRoute, readDatabaseRoute, updateDatabaseRoute, generateCampaignId } from '@/utils/httpRequester';
import useLocalStore from '@/utils/store';
import DMHeader from '../../components/dmPage/DMHeader/dmheader';
import DMActivePlayers from '../../components/dmPage/DMActivePlayers/dmactive';
import MapViewer from '../../components/dmPage/MapViewer';
import { MessageRecievePopUp } from "@/components/messaging/messageRecievedPopUp";

const DMHome = () => {
  const isRoomCreated = useRef(false)
  const {roomId, setRoomId, userId, setUserId} = useLocalStore()

  useEffect(() => {
    if(!isRoomCreated.current && roomId.length < 1){
      setRoomId("temp")
      if (userId == "") {
        setUserId("guestId")
      }
      const roomId = generateRoomCode()
      const campaignId = generateCampaignId()
      const roomJson = {
        "campaign_id": campaignId,
        "dm_id": userId,
        "participants": [""],
        "combat_log": [""],
        "start_time": new Date().toISOString(),
        "end_time": "",
        "encounters": []
      };

      createRoom(roomId, roomJson)
      setRoomId(roomId);
      isRoomCreated.current = true;
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const endTime = new Date().toISOString();
      patchDatabaseRoute(`rooms/${roomId}`, {end_time: endTime})
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  })

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
