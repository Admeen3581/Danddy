import React from 'react';
import DMHeader from '../../../DmComponents/dmHeader/dmheader';
import DMButtons from '../../../DmComponents/DMButtons/dmbuttons';
import DMNotes from '../../../DmComponents/DMNotes/dmnotes';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createRoom, deleteDatabaseRoute, generateRoomCode, readDatabaseRoute, updateDatabaseRoute } from '@/utils/httpRequester';
import {MessageRecievePopUp} from "@/components/messageRecievedPopUp";

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
