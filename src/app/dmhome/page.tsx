import React from 'react';
import DMHeader from '../../../DmComponents/dmHeader/dmheader';
import DMButtons from '../../../DmComponents/DMButtons/dmbuttons';
import DMNotes from '../../../DmComponents/DMNotes/dmnotes';
import { createRoom, deleteDatabaseRoute, generateRoomCode, readDatabaseRoute, updateDatabaseRoute } from '@/utils/httpRequester';

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

  // await createRoom(roomCode, roomData);

  // await updateDatabaseRoute("rooms/AAAAAA/players", roomData)
  // await updateDatabaseRoute("rooms/BBB/players", roomData)

  // console.log(readDatabaseRoute("rooms/AAAAAA/players/host"))

  // await deleteDatabaseRoute("rooms/4QFY8Z")

  return (
   <>
   <DMHeader />
   <DMButtons />
   <DMNotes />
   </>
  );
};

export default DMHome;
