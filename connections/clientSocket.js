import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';


const clientConnection = ( username, setMessages) => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [recipient, setRecipient] = useState(''); 
   
   




    useEffect(() => {


        // if(!username) return

        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);
        // newSocket.emit('registerUser', username);

        newSocket.on('connect',()=>{
             console.log(`socket connected ${username}`, newSocket.id );
             if (username) {
                newSocket.emit('registerUser', username); // Register the user once connected
            }
        });


    



        // Listen for incoming messages
        newSocket.on('newMessage', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        newSocket.on('updateContent', (data) => {
            console.log('Message updated:', data);
        });

        newSocket.on('deleteContent', (id) => {
            console.log('Message deleted:', id);
        });

        return () => newSocket.disconnect();






    }, [username]);


    const sendMessages = async (recipient) => {
        if (socket && username && recipient&& message.trim()) {

            const data = {
                sender:username,
                content:message,
                recipient:recipient,
                timestamp: new Date(),
            };
            

            try {
                socket.emit('newMessage',(data))
                console.log(`Message sent to ${recipient}: ${message}`);
                      
                // Send the message via Axios to your backend API
                await axios.post('http://localhost:3000/api/messages', data); // Adjust URL to your backend route
                setMessage('');// Clear the message input after sending
                setMessages((prevMessages) => [...prevMessages, data]) // updating the locale state  messages with rhe new one 
            } catch (error) {
                console.error('Error sending message:', error);
            }


        }
    }

    return {
        sendMessages,
        setMessage,
        message,
        registerUser:(username)=> socket?.emit('registerUser',username),
        setRecipient
    };

};

export default clientConnection;