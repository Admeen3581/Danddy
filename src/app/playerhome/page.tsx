"use client"

import React from 'react';
import PlayerHeader from '../../../PlayerHeaderComponents/PlayerHeader/playerheader';
import PlayerStats from '../../../PlayerHeaderComponents/PlayerStats/playerstats';
import PlayerNotes from '../../../PlayerHeaderComponents/PlayerNotes/playernotes';
import PlayerInfo from '../../../PlayerHeaderComponents/PlayerInfo/playerinfo';
import useLocalStore from '@/utils/store';



const DMHome = () => {

  const {roomId, setRoomId} = useLocalStore()

  console.log(roomId)

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
