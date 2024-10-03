'use client'

// Author: Adam Long
// Date: October 3, 2024
// Description: Component for a pop up displayed when a user recieves a message.


import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Terminal} from "lucide-react";

export function MessageRecievePopUp()
{
    return(
        <>
            <div className="flex relative h-screen items-center">
                <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Message Received!</AlertTitle>
                    <AlertDescription>
                    </AlertDescription>
                </Alert>
            </div>
        </>
    )
}

