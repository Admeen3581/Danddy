'use client'

// Author: Adam Long
// Date: October 2, 2024
// Description: Component for a message drawer popup. See messenger.ts

import {CircleX, SendHorizonalIcon} from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import React, {useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import {initFirestore} from "@/lib/messenger";
import {addDoc, collection} from "firebase/firestore";
import {serverTimestamp} from "firebase/firestore";


export function MessagePopUp()
{
    const [msg, setMsg] = useState('');
    const db = initFirestore();

    //prevent empty messages from being sent
    const handleSubmit = async () => {
        if (msg.trim() === "") {
            alert("Please enter a message.");
            return;
        }

        try {
            // Create a new document in the 'messages' collection
            const docRef = await addDoc(collection(db, "messages"), {
                text: msg,                // Store the text from the Textarea
                sentOn: serverTimestamp()     // Store the server timestamp
            });

            console.log("Document written with ID: ", docRef.id);

            // Clear the text field after submission
            setMsg("");

        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Failed to send message.");
        }
    }

    return (
        <>
        <Drawer>
            <DrawerTrigger asChild>
                <button className='button'>Message Danddy</button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Send your message to the danddy</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex items-center justify-center space-x-2">
                            <Textarea
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                                placeholder="Type your message here."
                            />
                        </div>
                    </div>

                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button onClick={handleSubmit}>
                                <SendHorizonalIcon/>&ensp;Send
                            </Button>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <Button>
                                <CircleX/>&ensp;Cancel
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
        </>
    )
}
