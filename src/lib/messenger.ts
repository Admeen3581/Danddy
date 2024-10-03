// Author: Adam Long
// Date: October 2, 2024
// Description: Backend code for messageDrawer.tsx

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";

initializeApp({
    // config if needed
});

const auth = getAuth();
const firestore = getFirestore();

