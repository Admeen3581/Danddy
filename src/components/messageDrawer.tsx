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
    const [text, setText] = useState('');

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const extractText = async(e) => {
        e.preventDefault();

        const db = initFirestore();

        const messagesCollection = collection(db, 'messages');
        const data = {
            text: text,
            sentOn: serverTimestamp()
        }

        const newDocRef = await addDoc(messagesCollection, data);
        console.log("New message created successfully with ID:", newDocRef);
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
                                value={text}
                                onChange={handleChange}
                                placeholder="Type your message here."
                            />
                        </div>
                    </div>

                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button onClick={extractText}>
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
