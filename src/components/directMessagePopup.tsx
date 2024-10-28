//@Author Adam Long
//@Date 10/27/2024
//@Project SCRUM-113

'use client'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export function DirectMessagePopup()
{
    //backend elements as required.

    return (
        <Sheet>
            <SheetTrigger className='button'>Direct Message</SheetTrigger>
            <SheetContent side={'right'}>
                <SheetHeader>
                    <SheetTitle>Direct Message</SheetTitle>
                    <SheetDescription>
                        Talk to your friends in secrecy...
                    </SheetDescription>
                </SheetHeader>
                [MAIN BODY]---

            </SheetContent>
        </Sheet>

    )
}
