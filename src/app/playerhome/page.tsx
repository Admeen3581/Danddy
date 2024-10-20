"use client"

import React, { useEffect, useRef } from 'react';
import PlayerHeader from '../../../PlayerHeaderComponents/PlayerHeader/playerheader';
import PlayerStats from '../../../PlayerHeaderComponents/PlayerStats/playerstats';
import useLocalStore from '@/utils/store';
import { getDnDAPI, readDatabaseRoute, updateDatabaseRoute } from '@/utils/httpRequester';
import PlayerSaving from '../../../PlayerHeaderComponents/PlayerSaving/playersaving';
import PlayerSense from '../../../PlayerHeaderComponents/PlayerSense/playersense';
import PlayerNotes from '../../../PlayerHeaderComponents/PlayerNotes/playernotes';



const PlayerHome = () => {

  const isRoomCreated = useRef(false)
  const {roomId, setRoomId} = useLocalStore()

  useEffect(() => {
    if(!isRoomCreated.current){
      try{
        readDatabaseRoute("rooms/"+roomId)
          .then((result) => {
            if(result == null){
              console.log("Room not found");
              setRoomId("null")
            }
            else{
              result.participants.push("joinedPlayer")
              updateDatabaseRoute("rooms/"+roomId, result)
            }
          })
      }
      catch{
        console.log("Room not found")
        setRoomId("null")
      }

      isRoomCreated.current = true;
    }
  });


  return (
   <>
      <PlayerHeader />
      <PlayerStats />
      <PlayerSaving />
      <PlayerSense />
      <PlayerNotes />
   </>
  );
};

export default PlayerHome;
