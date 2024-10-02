import React from 'react';
import PlayerHeader from '../../../PlayerHeaderComponents/PlayerHeader/playerheader';
import PlayerStats from '../../../PlayerHeaderComponents/PlayerStats/playerstats';
import PlayerNotes from '../../../PlayerHeaderComponents/PlayerNotes/playernotes';
import PlayerInfo from '../../../PlayerHeaderComponents/PlayerInfo/playerinfo';



const DMHome = () => {
  return (
   <>
      <PlayerHeader />
      <PlayerStats />
      <PlayerNotes />
      <PlayerInfo />
   </>
  );
};

export default DMHome;
