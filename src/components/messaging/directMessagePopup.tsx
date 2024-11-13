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
import { DoorOpen, SquarePen } from 'lucide-react';
import {ScrollArea} from "@/components/ui/scroll-area";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {initFirestore} from "@/lib/messenger";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import useLocalStore from "@/utils/store";

type convo = {
    //uid: number;
    user: string;
    content: string;
};

const tempConvos = [
    {user: 'Alice the wicked witch', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    {user: 'Bob', content: 'Are you free to chat?' },
    {user: 'Charlie', content: 'Let’s meet up tomorrow.' },
];

export function DirectMessagePopup({style})
{
    const [selectedMessage, setSelectedMessage] = useState<convo | null>(null);
    const [newUsername, setNewUsername] = useState('');
    const [creatingMessage, setCreatingMessage] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const userInfo = useLocalStore();

    //Firebase vars
    const firestoreDB = initFirestore();

    const handleChatCreate = () =>
    {
        setCreatingMessage(true);
    }

    const handleCreateConversation = () => {
        if (newUsername.trim() && newMessage.trim()) {
            // Add logic to create conversation (e.g., update state or API call)
            console.log("Creating conversation with:", newUsername, newMessage);

            // Reset input fields
            setNewUsername("");
            setNewMessage("");
            setCreatingMessage(false);
        }
    };

    const handleSelectConvo = (conversation: convo) => {
        setSelectedMessage(conversation);
    };

    const handleSelectConvoReturn = () => {
        setSelectedMessage(null);
    }

    const handleSendMessage = async (event) => {
        event.preventDefault();

        if(newMessage.trim()==='')
        {
            alert('Enter valid message');
            return;
        }

        if (newMessage.trim()) {
            console.log(`Sending message: ${newMessage}`);

            //backend
            await addDoc(collection(firestoreDB, 'directMessages'), {
                text: newMessage,
                uid: userInfo.userId,
                createdAt: serverTimestamp(),
                sentTo: selectedMessage!.user,
            })

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
                    <div className='create-chat-btn' onClick={handleChatCreate}>
                        <SquarePen/>
                    </div>
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
                            <div className='message-content'>
                                <ScrollArea>
                                    <div className="message incoming">
                                        <p className="content">{selectedMessage.content}</p>
                                    </div>
                                    <div className="message outgoing">
                                        <span className="content">This is a response message!</span>
                                    </div>
                                </ScrollArea>
                            </div>
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
                    creatingMessage ? (
                        <div className="new-conversation-box">
                            <input
                                type="text"
                                placeholder="Enter username..."
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                className="username-input"
                            />
                            <textarea
                                placeholder="Type your message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="message-input-new"
                            />
                            <button onClick={handleCreateConversation} className="create-conversation-btn">
                                Create Conversation
                            </button>
                        </div>
                    ) : (
                        <div className="conversations-container">
                            <ScrollArea>
                                {tempConvos.map(convo => (
                                    <div key={convo.user} className="conversation-preview" onClick={() => handleSelectConvo(convo)}>
                                    <span className="user">
                                        {convo.user.slice(0,21)}
                                        {convo.user.length > 21 && (
                                            "..."
                                        )}
                                    </span>
                                        <p className="preview-content">
                                            {convo.content.slice(0,30)} {/*change to most recent message*/}
                                            {convo.content.length > 30 && (
                                                "..."
                                            )}
                                        </p>
                                    </div>
                                ))}
                            </ScrollArea>
                        </div>
                    )
                )}
            </SheetContent>
        </Sheet>
    );
}
