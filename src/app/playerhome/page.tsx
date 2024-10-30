"use client"

import React, { useEffect, useRef } from 'react';
import PlayerHeader from '../../../PlayerComponents/PlayerHeader/playerheader';
import PlayerStats from '../../../PlayerComponents/PlayerStats/playerstats';
import useLocalStore from '@/utils/store';
import { getDnDAPI, readDatabaseRoute, updateDatabaseRoute } from '@/utils/httpRequester';
import PlayerSaving from '../../../PlayerComponents/PlayerSaving/playersaving';
import PlayerSense from '../../../PlayerComponents/PlayerSense/playersense';
import PlayerNotes from '../../../PlayerComponents/PlayerNotes/playernotes';



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
