/**
 * @Author Adam Long
 * @Date 10/29/24
 * @Project SCRUM-113 & SCRUM-157
 */

'use client'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import './directMessagePopup.css';

export function DirectMessagePopup({style})
{
    //backend elements as required.
    const messages = [
        { id: 1, user: 'Alice', content: 'Hey there!' },
        { id: 2, user: 'Bob', content: 'How are you?' },
        { id: 3, user: 'Alice', content: 'Doing great, thanks!' },
    ];//temp

    return (
        <Sheet>
            <SheetTrigger className={style}>Direct Message</SheetTrigger>
            <SheetContent side={'right'}>
                <SheetHeader>
                    <SheetTitle>Direct Message</SheetTitle>
                    <SheetDescription>
                        Talk to your friends in secrecy...
                    </SheetDescription>
                </SheetHeader>
                <div className="messages-container">
                    {messages.map(message => (
                        <div key={message.id} className={`message ${message.user === 'Alice' ? 'outgoing' : 'incoming'}`}>
                            <span className="user">{message.user}</span>
                            <p className="content">{message.content}</p>
                        </div>
                    ))}
                </div>
            </SheetContent>
        </Sheet>

    )
}
