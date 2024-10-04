"use client"

import React, { useEffect, useRef } from 'react';
import PlayerHeader from '../../../PlayerHeaderComponents/PlayerHeader/playerheader';
import PlayerStats from '../../../PlayerHeaderComponents/PlayerStats/playerstats';
import PlayerNotes from '../../../PlayerHeaderComponents/PlayerNotes/playernotes';
import PlayerInfo from '../../../PlayerHeaderComponents/PlayerInfo/playerinfo';
import useLocalStore from '@/utils/store';
import { readDatabaseRoute, updateDatabaseRoute } from '@/utils/httpRequester';



const PlayerHome = () => {

  const isRoomCreated = useRef(false)
  const {roomId, setRoomId} = useLocalStore()

  useEffect(() => {
    if(!isRoomCreated.current){
      try{
        console.log(readDatabaseRoute("rooms/"+roomId))
      }
      catch{
        console.log("Room not found")
      }

      isRoomCreated.current = true;
    }
  });


  return (
   <>
      <PlayerHeader />
      <PlayerStats />
      <PlayerNotes />
      <PlayerInfo />
   </>
  );
};

export default PlayerHome;
