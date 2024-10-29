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
import {useState} from "react";
import { DoorOpen } from 'lucide-react';

type convo = {
    id: number;
    user: string;
    content: string;
};

const tempConvos = [
    { id: 1, user: 'Alice the wicked witch', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { id: 2, user: 'Bob', content: 'Are you free to chat?' },
    { id: 3, user: 'Charlie', content: 'Let’s meet up tomorrow.' },
];

export function DirectMessagePopup({style})
{
    const [selectedMessage, setSelectedMessage] = useState<convo | null>(null);
    const [newMessage, setNewMessage] = useState('');

    const handleSelectConvo = (conversation: convo) => {
        setSelectedMessage(conversation);
    };

    const handleSelectConvoReturn = () => {
        setSelectedMessage(null);
    }

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            console.log(`Sending message: ${newMessage}`);
            setNewMessage('');
        }
    };

    return (
        <Sheet>
            <SheetTrigger className={style}>Direct Message</SheetTrigger>
            <SheetContent side={'right'} className="sheet-content">
                <SheetHeader>
                    <SheetTitle>Direct Message</SheetTitle>
                    <SheetDescription>Talk to your friends in secrecy...</SheetDescription>
                </SheetHeader>

                {selectedMessage ? (
                    <>
                        <div className="messages-container">
                            <div className='messages-header'>
                                <div className="back-arrow" onClick={handleSelectConvoReturn}>
                                    <DoorOpen/>
                                </div>
                                <div className='nameTitle'>
                                    <span className='user'>{selectedMessage.user}</span>
                                </div>
                            </div>
                            <br/>
                            <div className="message incoming">
                                <p className="content">{selectedMessage.content}</p>
                            </div>
                            {/* Display new messages here if needed */}
                        </div>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="message-input"
                            />
                            <button onClick={handleSendMessage} className="send-btn">Send</button>
                        </div>
                    </>
                ) : (
                    <div className="conversations-container">
                        {tempConvos.map(convo => (
                            <div key={convo.id} className="conversation-preview" onClick={() => handleSelectConvo(convo)}>
                                <span className="user">
                                    {convo.user.slice(0,21)}
                                    {convo.user.length > 21 && (
                                        "..."
                                    )}
                                </span>
                                <p className="preview-content">
                                    {convo.content.slice(0,30)}
                                    {convo.content.length > 30 && (
                                        "..."
                                    )}</p>
                            </div>
                        ))}
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
