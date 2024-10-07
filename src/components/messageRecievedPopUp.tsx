'use client'

// Author: Adam Long
// Date: October 3, 2024
// Description: Component for a pop up displayed when a user recieves a message.


import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {MessagesSquare} from "lucide-react";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {initFirestore} from "@/lib/messenger";
import {collection, deleteDoc, doc, DocumentData, limit, onSnapshot, orderBy, query} from "firebase/firestore";
import {Message} from "@/lib/utils";

export function MessageRecievePopUp()
{
    const db = initFirestore();
    const [isVisible, setVisiblity] = useState(false);
    const [latestMessage, setLatestMessage] = useState('');
    const [snapDoc, setSnapDoc] = useState('');

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('sentOn', 'desc'), limit(1));

        const unsub = onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
                const latestDoc = snapshot.docs[0]; // Get the most recent message
                const latestData = latestDoc.data() as DocumentData; // Access document data
                setSnapDoc(latestDoc.id);

                const msgData: Message = {
                    id: latestDoc.id,
                    text: latestData.text, // Access the 'text' field
                    sentOn: latestData.sentOn, // Adjust the type if needed (Firestore Timestamp)
                };
                setLatestMessage(msgData.text);//set msg
                setVisiblity(true); // Show the alert when a new message is detected
            } else {
                setLatestMessage(null); // No messages
            }
        });

        return () => unsub();
    }, []);

    const handleClose = async() => {
        setVisiblity(false);

        if (latestMessage) {
            try {
                // Delete the message from Firestore
                const messageRef = doc(db, 'messages', snapDoc); // Get the document reference
                await deleteDoc(messageRef); // Delete the document from Firestore
                console.log("Message deleted from Firestore:", snapDoc);
            } catch (error) {
                console.error("Error deleting message:", error);
            }
        }
    }

    return(
        <>
            {isVisible && latestMessage && (
                <div className="flex items-center justify-center relative">
                    <Alert className="w-full max-w-md p-7 mt-40">
                        <MessagesSquare className="h-6 w-6" />
                        <div className="relative text-center">
                            <AlertTitle className='font-bold'>Message Received!</AlertTitle>
                            <AlertDescription className='mt-5'>
                                {latestMessage}
                            </AlertDescription>
                            <div className='align-right justify-center mt-12'>
                                <Button onClick={handleClose}>
                                    Close
                                </Button>
                            </div>
                        </div>
                    </Alert>
                </div>
            )}
        </>
    )
}

