// Author: Adam Long
// Date: October 3, 2024
// Description: Backend code for messageDrawer.tsx

import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import messageButtonState from "@/lib/messageButtonState";

export function initFirestore()
{
    const app = initializeApp({
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
        databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_APP_ID
    });

    return getFirestore(app);
}

