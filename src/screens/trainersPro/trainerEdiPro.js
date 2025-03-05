import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Image, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Modal, FlatList, Button } from 'react-native';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ListItem, Icon } from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';






const EditProfile = ({ route, navigation }) => {
    const [mediat, setMediat] = useState("");
    


    const pickMedia = async () => {
        const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync({accessPrivileges:'all'});
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync({accessPrivileges:'all'});
        let result = null;


        try {
             if (mediaStatus !== 'granted'|| cameraStatus !=='granted'){
                 alert ('permission are required to access media')

             }else{
                  result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes:['images','videos'],
                    allowsEditing:true,
                    aspect:[4,3],
                    quality:1
                 })
             }
             console.log(result)

        }catch(error){
            console.log('error caught',error.message)
        }

    }





    return (
        <SafeAreaView>
            <View>
                <Text style={styles.text}>EditePro</Text>
                <TouchableOpacity onPress={()=>setMediat(pickMedia)}>
                    <Text  style={styles.texto}>UPLOAD MEDIAT PROFILE</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

};


const styles = StyleSheet.create({



    text: {
        fontSize: 25,
        fontWeight: "bold",
        fontStyle: "italic",
        fontWeight: 'condensed'
    },
    texto:{

        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "italic",
        fontWeight: 'condensed',
        textAlign:'center',
        lineHeight:50,
        textDecorationStyle:"dotte",
        textShadowColor:'white',
        paddingTop:100



    },
    texta:{

        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "italic",
        fontWeight: 'condensed',
        textAlign:'center',
        lineHeight:50,
        textDecorationStyle:"dotte",
        textShadowColor:'white',
        paddingTop:115



    },
   
});

export default EditProfile;