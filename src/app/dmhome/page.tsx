import React from 'react';
import DMHeader from '../../../DmComponents/dmHeader/dmheader';
import DMButtons from '../../../DmComponents/DMButtons/dmbuttons';
import DMNotes from '../../../DmComponents/DMNotes/dmnotes';
import { createRoom, generateRoomCode, readDatabaseRoute, updateDatabaseRoute } from '@/utils/httpRequester';

const DMHome = async () => {

  // const roomCode = generateRoomCode();  // Generate a random room code
  // const roomData = {
  //     host: "John Doe",
  //     players: {},
  //     settings: {
  //         maxPlayers: 4,
  //         isPrivate: true
  //     }
  // };

  //await createRoom(roomCode, roomData);

  //await updateDatabaseRoute("rooms/AAAAAA/players", roomData)

  //console.log(readDatabaseRoute("rooms/AAAAAA/players/host"))

  return (
   <>
   <DMHeader />
   <DMButtons />
   <DMNotes />
   </>
  );
};

export default DMHome;
