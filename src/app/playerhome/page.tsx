"use client"

import React, { useEffect, useRef } from 'react';
import PlayerHeader from '../../../components/PlayerComponents/PlayerHeader/playerheader';
import PlayerStats from '../../../components/PlayerComponents/PlayerStats/playerstats';
import useLocalStore from '@/utils/store';
import { getDnDAPI, readDatabaseRoute, updateDatabaseRoute } from '@/utils/httpRequester';
import PlayerSaving from '../../../components/PlayerComponents/PlayerSaving/playersaving';
import PlayerSense from '../../../components/PlayerComponents/PlayerSense/playersense';
import PlayerNotes from '../../../components/PlayerComponents/PlayerNotes/playernotes';
import { update } from 'firebase/database';



const PlayerHome = () => {

  const isRoomCreated = useRef(false)
  const {roomId, setRoomId, userId} = useLocalStore()
  
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
              const containsUserId = result.participants.includes(userId);
              if (!containsUserId) {
                const emptyIndex = result.participants.indexOf("");
                if (emptyIndex !== -1) {
                  // Replace the empty string with userId
                  result.participants[emptyIndex] = userId;
                } else {
                  // Append userId to the participants array
                  result.participants.push(userId);
                }
                updateDatabaseRoute("rooms/" + roomId, result)
              }
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
