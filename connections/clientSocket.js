import React, { useEffect, useState,useCallback } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import {GiftedChat} from 'react-native-gifted-chat';



const clientConnection = (username, setMessages) => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [recipient, setRecipient] = useState('');

    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log(`Socket connected: ${username}, ${newSocket.id}`);
            if (username) {
                newSocket.emit('registerUser', username);
            }
        });

        // Listen for incoming messages
        newSocket.on('newMessage', (data) => {
            const formattedMessage = {
                _id: data.id || new Date().getTime(), // Generate unique ID if not provided
                text: data.content,
                createdAt: new Date(data.timestamp),
                user: {
                    _id: data.sender,
                    name: data.username,
                },
            };
            setMessages((prevMessages) => GiftedChat.append(prevMessages, formattedMessage));
        });

        return () => newSocket.disconnect();
    }, [username]);

    const sendMessages = async (recipient) => {
        if (socket && username && recipient && message.trim()) {
            const data = {
                sender: username,
                content: message,
                recipient: recipient,
                timestamp: new Date(),
            };

            try {
                socket.emit('newMessage', data);
                console.log(`Message sent to ${recipient}: ${message}`);

                const formattedMessage = {
                    _id: new Date().getTime(),
                    text: message,
                    createdAt: new Date(),
                    user: {
                        _id: username,
                        name: username,
                    },
                };

                setMessages((prevMessages) => GiftedChat.append(prevMessages, formattedMessage));
                await axios.post('http://localhost:3000/messages', data); // Update your backend as well
                setMessage(''); // Clear the input
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return {
        sendMessages,
        setMessage,
        message,
        registerUser: (username) => socket?.emit('registerUser', username),
        setRecipient,
    };
};

export default clientConnection;