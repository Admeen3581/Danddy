import {initFireRealBase} from "@/lib/messenger";
import {equalTo, get, onValue, orderByChild, query, ref} from "firebase/database";

const realDB = initFireRealBase();

export const listenToUserData = (userId: string, callback: (data: object) => void) => {

    const userRef = ref(realDB, `users/${userId}/username`);

    onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {

            const pairing = {username: snapshot.val(), uid: userId};
            callback(pairing);

        } else {
            callback([null]); // Handle no data case
        }
    });
};

const findExternalUsernames = async (username: string) => {
    try {
        const usersRef = ref(realDB, "users");
        const snapshot = await get(usersRef);

        if (snapshot.exists()) {
            const users = snapshot.val();
            const userId = Object.keys(users).find(
                (key) => users[key].username === username
            );
            return userId || null; // Return userId or null if not found
        } else {
            console.log("No users found.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user ID:", error.message);
        return null;
    }
};

export default findExternalUsernames;