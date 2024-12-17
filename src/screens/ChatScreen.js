import React, { useEffect, useState, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, SafeAreaView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import clientConnection from '../../connections/clientSocket';

const ChatScreen = () => {
    const [username, setUsername] = useState('User');
    const [messages, setMessages] = useState([]);
    const [recipient, setRecipient] = useState('');
    const { sendMessages, setMessage, message, registerUser } = clientConnection(username, setMessages);

    useEffect(() => {
        if (username && !recipient) {
            registerUser(username);
        }
    }, [username, registerUser, recipient]);

    const handleSend = () => {
        if (recipient.trim()) {
            sendMessages(recipient);
        } else {
            console.log('Recipient is required');
        }
    };

    const onsend = useCallback((newMessages = []) => {
        if (newMessages.length > 0) {
            const [messageToSend] = newMessages;
            sendMessages(recipient); // Emit message to the server

            // Add the new message locally
            setMessages((previousMessages) => GiftedChat.append(previousMessages, [messageToSend]));
        }

    }, [recipient, sendMessages])

    useEffect(() => {
        if (message) {
            // Assuming `message` comes from socket or server (you'll have to adapt this)
            const newMessage = {
                _id: message.id || Date.now(),  // Ensure each message has a unique ID
                text: message.text,
                createdAt: new Date(),
                user: {
                    _id: message.userId || username,  // Use the current user ID
                    name: message.username || username,  // Default to the current user's name
                },
            };
            setMessages((previousMessages) => GiftedChat.append(previousMessages, [newMessage]));
        }
    }, [message, username]);

    return (

        <SafeAreaView  style={styles.container}>
            <View style={styles.container}>
                {/* Registration */}
                <View style={styles.registrationContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter recipient"
                        value={recipient}
                        onChangeText={setRecipient}
                    />
                    <TouchableOpacity onPress={() => registerUser(username)} style={styles.registerButton}>
                        <Text style={styles.registerButtonText}>Register</Text>
                    </TouchableOpacity>
                </View>
                <GiftedChat
                    messages={messages}
                    onSend={onsend}
                    user={{
                        _id: username,
                        name: username,
                    }}
                    placeholder="Type a message..."
                    showUserAvatar={true}
                    alwaysShowSend
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    registrationContainer: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        marginHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 5,
    },
    registerButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    registerButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});


export default ChatScreen


