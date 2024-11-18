import {initFireRealBase} from "@/lib/messenger";
import { onValue, ref } from "firebase/database";

const listenToUserData = (userId: string, callback: (data: String) => void) => {

    const realDB = initFireRealBase();

    const userRef = ref(realDB, `users/${userId}/username`);

    onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
            callback(snapshot.val()); // Pass data to the callback
        } else {
            callback(null); // Handle no data case
        }
    });
};

export default listenToUserData;