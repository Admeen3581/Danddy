"use client"

import React, { useEffect } from 'react';
import DMButtons from '../../../DmComponents/DMButtons/dmbuttons';
import DMNotes from '../../../DmComponents/DMNotes/dmnotes';
import DMHeader from '../../../DmComponents/dmHeader/dmheader';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createRoom, deleteDatabaseRoute, generateRoomCode, readDatabaseRoute, updateDatabaseRoute } from '@/utils/httpRequester';
import useLocalStore from '@/utils/store';

const DMHome = () => {

  // const {roomId, setRoomId} = useLocalStore()

  // useEffect(() => {

  //   const roomId = generateRoomCode()
  //   const roomJson = {
  //     "campaign_id": "campaign_id_1",
  //     "user_id": "user_id_1",
  //     "participants": ["character_id_1", "character_id_2"],
  //     "combat_log": [
  //       "Thorn casts Fireball on Garrosh",
  //       "Garrosh takes 18 damage",
  //       "Garrosh swings Greatsword at Thorn",
  //       "Thorn dodges the attack"
  //     ],
  //     "start_time": "2024-09-28T19:00:00Z",
  //     "end_time": "2024-09-28T20:15:00Z"
  //   };

  //   createRoom(roomId, roomJson)
  //   setRoomId(roomId);
  // }, []);

  return (
   <>
   <DMHeader />
   <DMButtons />
   <DMNotes />
   </>
  );
};

export default DMHome;
