
import React, { useEffect, useState } from 'react';
import { View, FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import clientConnection from '../../connections/clientSocket';


const ScreenWidth = Dimensions.get('window').width;
const Width = Math.round(ScreenWidth * 1);
const ScreenHeight = Dimensions.get("window").height;
const Height = Math.round(ScreenHeight * 0.3);



const ChatScreen = ({ onsendMessage, onAttach }) => {


  const [username, setUsername] = useState('User');
  const [messages, setMessages] = useState([]);
  const { sendMessages, setMessage, message,registerUser} = clientConnection(setMessages, username)


  useEffect(() => {

    if (username) {
      registerUser(username)
    }

  }, [username])


  const inputChange = (text) => {
    setMessage(text);
  };
  const sendMessage = () => {
    if (message.trim()) {
      try {
        sendMessages();
        setMessage('');

      } catch (error) {
        console.log("error sanding message", error)

      }
    } else {
      console.log('message cannot be empty ')
    }
  };

  const handleAttach = () => {
    onAttach()
  };

  const handleRegister = () => {
    if (username.trim()) {
      // Register the client with the server
      registerUser(username);
    } else {
      console.log("Username is required for registration");
    }
  };
  const handleUsernameChange = (text) => {
    setUsername(text);
  };

     


  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.registrationContainer}>
          <TextInput
            style={styles.usernameInput}
            placeholder="Enter username"
            value={username}
            onChangeText={handleUsernameChange}
            returnKeyType="done"
            onSubmitEditing={handleRegister} // Register when the "done" button is pressed
          />
          <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      
        <View>
          {/* Chat Input Section */}
          <View style={styles.inputContainer}>
            {/* Attachment Button */}
            <TouchableOpacity onPress={handleAttach} style={styles.attachButton}>
              <Image source={require('../../assets/images/attachmentIcon.png')} style={styles.attachIcon} />
            </TouchableOpacity>

            {/* Text Input */}
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              value={message}
              onChangeText={inputChange}
              onSubmitEditing={sendMessage} // Allow message sending when Enter is pressed
              returnKeyType="send" // Show send button on the keyboard
            />

            {/* Send Button */}
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton} disabled={!message.trim()}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>

          {/* Display Messages */}
          <FlatList
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.messageContainer}>
                <Text>{item.from}: {item.content}</Text>
              </View>
            )}
          />
        </View>
    
    </SafeAreaView>
  );


};






const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  registrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:3,
  },
  usernameInput: {
    width: '80%',
    height: 50,
    borderColor: 'black',
    borderWidth: 5,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  registerButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  registerButtonText: {
    color: 'black',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
  messageContainer: {
    padding: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  attachButton: {
    marginRight: 10,
  },
  attachIcon: {
    width: 30,
    height: 30,
  },
});

export default ChatScreen