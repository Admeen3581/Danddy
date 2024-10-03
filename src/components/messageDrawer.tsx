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
import React from "react";
import {Textarea} from "@/components/ui/textarea";


export function MessagePopUp()
{

    return (
        <>
        <Drawer>
            <DrawerTrigger asChild>
                <button className='button'>Message Daddy</button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Send your message to the daddy</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex items-center justify-center space-x-2">
                            <Textarea placeholder="Type your message here." ></Textarea>
                        </div>
                    </div>

                    <DrawerFooter>
                        <Button>
                            <SendHorizonalIcon/>&ensp;Send
                        </Button>
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


