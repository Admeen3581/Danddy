/**
 * @Author Adam Long
 * @Date 11/24/24
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
import {useEffect, useState} from "react";
import { DoorOpen, SquarePen } from 'lucide-react';
import {ScrollArea} from "@/components/ui/scroll-area";
import useLocalStore from "@/utils/store";
import findExternalUsernames from "@/app/messaging/fetchUserMessages";
import {push, serverTimestamp} from "@firebase/database";
import {getDatabase, ref, set} from "firebase/database";
import {readDatabaseRoute} from "@/utils/httpRequester";

type convo = {
    uid: string;
    username: string;
    content: string[];
};

const db = getDatabase();

export function DirectMessagePopup({style})
{
    const [selectedConversation, setSelectedConversation] = useState<convo | null>(null);
    const [conversations, setConversations] = useState([]);
    const [newUsername, setNewUsername] = useState('');
    const [creatingMessage, setCreatingMessage] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const [heardMessages, setHeardMessages] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const userInfo = useLocalStore();

    /**
     * Checks for new messages
     * @author Adam Long
     * @async
     */
    useEffect(() => {
        const loadMessages = async () => {
            if (userInfo.userId) {
                try {
                    const data = await readDatabaseRoute(`users/${userInfo.userId}/directMessages/${tempHelp}`);
                    const messagesArray = Object.entries(data || {}).map(([id, message]) => ({
                        id,
                        ...message,//contains sentByYou, content, timeStamp
                    }));
                    setHeardMessages(messagesArray);
                } catch (error) {
                    console.error(`Error loading user ${userInfo.userId} messages: `, error);
                } finally {
                    setIsSending(false);
                }
            }
        };
        loadMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSending, selectedConversation]);

    /**
     * Checks for new conversations
     * @author Adam Long
     * @async
     */
    useEffect(() => {
        const loadConvos = async () => {
            if (userInfo.userId) {
                try {
                    const data = await readDatabaseRoute(`users/${userInfo.userId}/conversations`);
                    const convosArray = Object.entries(data || {}).map(([id, convo]) => ({
                        id,
                        ...convo,//contains uid, username, & content
                    }));
                    setConversations(convosArray);
                } catch (error) {
                    console.error(`Error loading user ${userInfo.userId} messages: `, error);
                } finally {
                    setIsSending(false);
                }
            }
        };
        loadConvos();
    }, [isSending]);

    const tempHelp = "LMJj6Ne1LoabiXW8iYKbCARkACi2"//remove when done

    /**
     * Changes state if user is currently creating a new conversation.
     * @author: Adam Long
     */
    const handleChatCreate = () =>
    {
        setCreatingMessage(true);
    }

    /**
     * Creates new conversation based on input fields upon a button press.
     * @author Adam Long
     * @async
     */
    const handleCreateConversation = async (event) => {
        event.preventDefault();

        if (newUsername.trim() && newMessage.trim()) {
            // Add logic to create conversation (e.g., update state or API call)
            console.log("Creating conversation with:", newUsername, newMessage);
            const newConvo = {
                uid: await findExternalUsernames(newUsername),
                username: newUsername,
                content: [newMessage]
            } as convo;

            setSelectedConversation(newConvo);


            try {
                //Saves new conversation object
                const convosRef = ref(db, `users/${userInfo.userId}/conversations`);
                const convosRefKey = push(convosRef);
                set(convosRefKey, {
                    uid: newConvo.uid,
                    username: newConvo.username,
                    content: newConvo.content,
                }).catch((e) => {
                    throw e;
                })
            } catch (error) {
                console.error(`Error saving conversation of user ${newConvo.uid} for ${userInfo.userId}:`, error);
            }

            setIsSending(true);

            // Reset input fields
            setNewUsername("");
            setNewMessage("");
            setCreatingMessage(false);
        }
    };

    /**
     * Changes state if user is currently entering an existing conversation.
     * @param conversation Conversation object
     * @author Adam Long
     */
    const handleSelectConvo = (conversation: convo) => {
        setSelectedConversation(conversation);
        setIsSending(true);
    };

    /**
     * Changes state is user exits current conversation.
     * @author Adam Long
     */
    const handleSelectConvoReturn = () => {
        setSelectedConversation(null);
    }

    /**
     * User is inside existing conversation and sends a message to other user.
     * @async
     * @param event async event
     * @author Adam Long
     */
    const handleSendMessage = async (event) => {
        event.preventDefault();

        if(newMessage.trim()==='')
        {
            alert('Enter valid message');
            return;
        }

        if (newMessage.trim()) {
            console.log(`Sending message: ${newMessage}`);

            //backend (pushes new message to database
            const recievingUserId = await findExternalUsernames(selectedConversation!.username);
            const timeStamp = serverTimestamp();

            if (recievingUserId && userInfo.userId) {
                try {
                    //Saves receiver messages
                    const receiverMessagesRef = ref(db, `users/${recievingUserId}/directMessages/${userInfo.userId}`);
                    const receiverMessagesRefKey = push(receiverMessagesRef);
                    set(receiverMessagesRefKey, {
                        content: newMessage,
                        sentByYou: false,
                        timeStamp: timeStamp,
                    }).catch((e) => {
                        throw e;
                    })
                } catch (error) {
                    console.error(`Error saving received direct message to user ${recievingUserId}:`, error);
                }
                try {
                    //Saves sender messages
                    const senderMessagesRef = ref(db, `users/${userInfo.userId}/directMessages/${recievingUserId}`);
                    const senderMessagesRefKey = push(senderMessagesRef);
                    set(senderMessagesRefKey, {
                        content: newMessage,
                        sentByYou: true,
                        timeStamp: timeStamp,
                    }).catch((e) => {
                        throw e;
                    })
                } catch (error) {
                    console.error(`Error saving sent direct message to user ${userInfo.userId}:`, error);
                }
                setIsSending(true);
            }

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

                {selectedConversation ? (
                    <>
                        <div className="messages-container">
                            <div className='messages-header'>
                                <div className="back-arrow" onClick={handleSelectConvoReturn}>
                                    <DoorOpen/>
                                </div>
                                <div className='nameTitle'>
                                    <span className='user'>{selectedConversation.username}</span>
                                </div>
                            </div>
                            <br/>
                            {/*Look here for message UI changes.*/}
                            <div className='message-content'>
                                <ScrollArea>
                                    <div className='message outgoing'>
                                        <p className='content'>{selectedConversation.content[0]}</p>
                                    </div>
                                    {heardMessages.length > 0 ? (
                                        heardMessages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={`message ${msg.sentByYou ? "outgoing" : "incoming"}`}
                                            >
                                                <p className="content">{msg.content}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div/>//empty div
                                    )}
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
                                {conversations.map(convo => (
                                    <div key={convo.uid} className="conversation-preview" onClick={() => handleSelectConvo(convo)}>
                                    <span className="user">
                                        {convo.username.slice(0,21)}
                                        {convo.username.length > 21 && (
                                            "..."
                                        )}
                                    </span>
                                        <p className="preview-content">
                                            {convo.content[convo.content.length-1].slice(0,30)} {/*change to most recent message*/}
                                            {convo.content[convo.content.length-1].length > 30 && (
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
