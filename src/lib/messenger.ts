// Author: Adam Long
// Date: October 3, 2024
// Description: Backend code for messageDrawer.tsx

import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

export function initFirestore()
{
    const app = initializeApp({
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DATABASE_URL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID
    });

    return getFirestore(app);
}

