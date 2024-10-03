'use client'

// Author: Adam Long
// Date: October 3, 2024
// Description: Component for a pop up displayed when a user recieves a message.


import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {MessagesSquare} from "lucide-react";
import {useState} from "react";
import {Button} from "@/components/ui/button";

export function MessageRecievePopUp()
{
    const [isVisible, setVisiblity] = useState(true);

    const handleClose = () => {
        setVisiblity(false);
    }

    return(
        <>
            {isVisible && (
                <div className="flex items-center justify-center relative">
                    <Alert className="w-full max-w-md p-7 mt-40">
                        <MessagesSquare className="h-6 w-6" />
                        <div className="relative text-center">
                            <AlertTitle>Message Received!</AlertTitle>
                            <AlertDescription>
                                [Insert message here]
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

