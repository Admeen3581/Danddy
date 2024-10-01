import React from 'react';
import DMHeader from '../../../DmComponents/dmHeader/dmheader';
import DMButtons from '../../../DmComponents/DMButtons/dmbuttons';
import DMNotes from '../../../DmComponents/DMNotes/dmnotes';
import { createRoom, generateRoomCode } from '@/utils/httpRequester';

const DMHome = () => {

  const roomCode = generateRoomCode();  // Generate a random room code
  const roomData = {
      host: "John Doe",
      players: {},
      settings: {
          maxPlayers: 4,
          isPrivate: true
      }
  };

createRoom(roomCode, roomData);

  return (
   <>
   <DMHeader />
   <DMButtons />
   <DMNotes />
   </>
  );
};

export default DMHome;
