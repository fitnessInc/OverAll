import React from "react";
import { Input, Button, Icon, Text } from "react-native-elements";
import { View, ImageBackground, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Svg } from "react-native-svg";
import { Dimensions } from 'react-native';
import { BackgroundImage } from "@rneui/base";
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';



const LoggingScreen = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const Submit = () => {
        console.log("Username:", username);
        console.log("Password:", password);

    }

    return (


        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={text => setUsername(text)}
                    value={username}
                />
                <Ionicons name="person" size={24} color="black" style={styles.icon} />
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                />
                <Ionicons name="lock-closed" size={24} color="black" style={styles.icon} />
            </View>
            <TouchableOpacity style={styles.button} onPress={Submit}>
                <Text style={styles.buttonText}>Log In</Text>
                <Text style={{ margin: 10, justifyContent: 'center' }}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={styles.socialIcons}>
                <Ionicons name="logo-facebook" size={24} color="blue" style={styles.socialIcon} />
                <Ionicons name="logo-google" size={24} color="red" style={styles.socialIcon} />
                <Ionicons name="logo-linkedin" size={24} color="purple" style={styles.socialIcon} />
            </View>  
            </TouchableOpacity>
        </View>




    )

}



const styles = StyleSheet.create({


    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    input: {
        height: 50,
        width: '200',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 100,
        marginBottom: 0,
    },
    button: {
        backgroundColor: 'transparent',
        padding: 10,
        borderRadius: 3,
        alignContent: 'center',
        textAlign: 'right'
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center'


    },
    icon: {
        position: 'absolute',
        right: 10,
    },
    socialIcons: {
        flexDirection: 'row',
        marginTop: 10,
        
    },
    socialIcon: {
        marginHorizontal: 10,
    }


})

export default LoggingScreen;