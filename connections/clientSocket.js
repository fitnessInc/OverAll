import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import io from 'socket.io-client';


const clientConnection = () => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');


    useEffect(() => {

        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);

       

        // Listen for incoming messages
        newSocket.on('content', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        newSocket.on('updateContent', (data) => {
            console.log('Message updated:', data);
        });

        newSocket.on('deleteContent', (id) => {
            console.log('Message deleted:', id);
        });

        return () => newSocket.disconnect();






    }, [])

};

const  sendMessages = async()=>{
     if (socket & username & message){

        const data = {
            username,
            message,
            timestamp: new Date(),
        };

        try {
            // Send the message via Axios to your backend API
            await axios.post('http://localhost:3000/api/messages', data); // Adjust URL to your backend route
            setMessage('');// Clear the message input after sending
            setMessages((prevMessages)=>[...prevMessages,data]) // updating the locale state  messages with rhe new one 
        } catch (error) {
            console.error('Error sending message:', error);
        }
    

     }
}