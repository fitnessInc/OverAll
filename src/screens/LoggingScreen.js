import React from "react";
import { Input, Button, Icon, Text } from "react-native-elements";
import { View, ImageBackground, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Svg } from "react-native-svg";
import { Dimensions } from 'react-native';
import { BackgroundImage } from "@rneui/base";
import { useState } from 'react';
// import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';



const LoggingScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setEerror]= useState();
    const [spinnerLoad, setSpinnerLoad]= useState(false)

    
      const  handleSignIn= async()=>{
        setEerror('')
        if (!email||!password){
            setEerror('input your email and password ')
            return
        }else{
            setSpinnerLoad(true)
             try{
                await signInWithEmailAndPassword(Auth, email.trim(), password);

             }catch(e){
                setEerror(authError(e.code))

             }finally{
                setSpinnerLoad(false)
             }
        }
             
    

        


      }

    return (


        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={text => setEmail(text)}
                    value={email}
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
                {error?<Text className="text-red-500 mb-3">{error}</Text> : null}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Tap To Login</Text>
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

};

function authError(code) {
  switch (code) {
    case 'auth/invalid-email':
      return 'That email address looks invalid.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Try again later.';
    default:
      return 'Something went wrong. Please try again.';
  }
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