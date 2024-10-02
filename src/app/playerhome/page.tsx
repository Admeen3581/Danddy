import React from 'react';
import PlayerHeader from '../../../PlayerHeaderComponents/PlayerHeader/playerheader';
import PlayerStats from '../../../PlayerHeaderComponents/PlayerStats/playerstats';
import PlayerNotes from '../../../PlayerHeaderComponents/PlayerNotes/playernotes';



const DMHome = () => {
  return (
   <>
      <PlayerHeader />
      <PlayerStats />
      <PlayerNotes />
   </>
  );
};

export default DMHome;
