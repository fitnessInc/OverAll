
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
  const { sendMessages, setMessage, message, registerUser } = clientConnection(setMessages, username)


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

  const renderMessageItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text>{item.sender}: {item.content}</Text>
    </View>
  );


  const renderInputMessage = () => (
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
        onSubmitEditing={sendMessage}
        returnKeyType="send"
      />

      {/* Send Button */}
      <TouchableOpacity onPress={sendMessage} style={styles.sendButton} disabled={!message.trim()}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Registration Form */}

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


      {/* Chat Box */}
      <FlatList
        data={[...messages, { sender: username, content: message }]} // Add input message to data
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMessageItem}
        ListFooterComponent={renderInputMessage} // The input message will be rendered here
        contentContainerStyle={styles.messageList}
      />
    </SafeAreaView>



  );


};






const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    marginTop: 50
  },
  registrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  usernameInput: {
    width: 50,
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
    borderRadius: 10,
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
    height: 50,
    borderColor: 'black',
    fontSize: 40,
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
    color: 'black',
    fontSize: 25,
  },
  messageContainer: {
    padding: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginTop: 40

  },
  attachButton: {
    marginRight: 10,
  },
  attachIcon: {
    width: 30,
    height: 30,
  },

  receivedMessage: {
    backgroundColor: '#e2e3e5', // Light gray for received messages
    alignSelf: 'flex'
  }  
});

export default ChatScreen