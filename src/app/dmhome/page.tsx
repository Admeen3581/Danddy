import React from 'react';
import DMButtons from '../../../DmComponents/DMButtons/dmbuttons';
import DMNotes from '../../../DmComponents/DMNotes/dmnotes';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createRoom, deleteDatabaseRoute, generateRoomCode, readDatabaseRoute, updateDatabaseRoute } from '@/utils/httpRequester';
import DMHeader from '../../../DmComponents/DMHeader/dmheader';

const DMHome = async () => {
  return (
   <>
   <DMHeader />
   <DMButtons />
   <DMNotes />
   </>
  );
};

export default DMHome;
