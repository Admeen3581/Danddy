// Author: Adam Long
// Date: October 2, 2024
// Description: Backend code for messageDrawer.tsx

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";

firebase.initializeApp({
  //config if needed
})

const auth = firebase.auth();
const firestore = firebase.firestore();