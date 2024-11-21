"use client"

import React, { useEffect, useRef } from 'react';
import PlayerHeader from '../../components/playerPage/PlayerHeader/playerheader';
import PlayerStats from '../../components/playerPage/PlayerStats/playerstats';
import useLocalStore from '@/utils/store';
import { readDatabaseRoute, updateDatabaseRoute } from '@/utils/httpRequester';
import PlayerSaving from '../../components/playerPage/PlayerSaving/playersaving';
import PlayerSense from '../../components/playerPage/PlayerSense/playersense';
import PlayerNotes from '../../components/playerPage/PlayerNotes/playernotes';
import {useRouter} from "next/navigation";



const PlayerHome = () => {

  const isRoomCreated = useRef(false)
  const {roomId, setRoomId, userId} = useLocalStore()
  const router = useRouter();

  readDatabaseRoute(`users/${userId}/characters/${roomId}`).then(
    (result) => {
      if(result == null)
        {
          router.push("./charactercreation");
        }
    }
  )
  
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
