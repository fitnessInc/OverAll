import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Modal, FlatList, } from 'react-native';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ListItem, Button } from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';
import { Video } from "expo-av";
import { useSelector, useDispatch } from "react-redux";
import { setProfileMeta, clearProfileMeta } from "../../../redux/slices/imageSlice";
import { updateInfoPro } from "../../../redux/slices/infoSlice";
import Pro from "./profileOne";
import { useRoute } from "@react-navigation/native";
import { metaProfile } from "../../../redux/slices/videoSlice";

// const data = [
//     {
//         id: 'user1',
//         Full_Name: 'nanito',
//         Address: 'xxx',
//         Function: 'Calisthenics',
//         Certification: ' Nasam',
//         meta: null


//     },
//     {
//         id: 'user2',
//         Full_Name: 'Aicha Ahmat',
//         Address: ' Address: 646 berge ave NJ',
//         Function: '  weight trainer ',
//         Certification: 'Nasam',
//         meta: null


//     },
//     {
//         id: 'user3',
//         Full_Name: 'Alato Sow',
//         Address: ' Address: 646 berge ave NJ',
//         Function: ' weight trainer ',
//         Certification: 'Nasam',
//         meta: null


//     },
// ];
const ScreenWidth = Dimensions.get('window').width;
const Width = Math.round(ScreenWidth * 1);
const ScreenHeight = Dimensions.get("window").height;
const Height = Math.round(ScreenHeight * 0.3);


const EditProfile = ({ route,navigation}) => {



    const routeHook = useRoute();
    console.log('routeObject',routeHook)
    const dispatch = useDispatch();
    const { profileId, profileData } = route.params;

    // Get data from Redux
    const profileImages = useSelector(state => state.image.profiles[profileId]);
    console.log('image profile', profileImages)
    const infoProfiles = useSelector(state => state.info.infoPro[profileId]);
    console.log('info', infoPro)

    const pickMedia = async (profileId) => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access media library is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets?.length > 0) {
            const metaUri = result.assets[0].uri;
            //   setSelectedMeta(prev => ({ ...prev, [profileId]: metaUri }));
            dispatch(setProfileMeta({
                id: profileId,
                newImage: metaUri
            }))
        }
    };

    //    const saveImagePro = () => {
    //     //  if (selectedMeta[profileId]) {
    //     //     dispatch(setProfileMeta({ 
    //     //      id: profileId, 
    //     //      meta: selectedMeta[profileId] 
    //     //     }));
    //     //    alert('Image saved for profile ' + profileId);
    //     //  }

    //       return  pickMedia
    //   };

    const infoSave = () => {
        // Save all text changes to Redux
        Object.entries(text).forEach(([id, newData]) => {
            if (newData && Object.keys(newData).length > 0) {
                dispatch(updateInfoPro({ id, newData }));
            }
        });

        // Navigate to profile screen
        const firstItemId = Object.keys(text)[0] || data[0].id;

        navigation.navigate('Pro', { itemId: firstItemId });

        setTimeout(() => {
            navigation.navigate('Profiles', { itemId: firstItemId });
        }, 600);
    };



    const renderItem = ({ item }) => {

        const UserId = item.id;
        const UserProfiles = profileImages[UserId]

        return (
            <View style={styles.profileContainer}>
                {/* Profile Image Section */}
                <View style={styles.imageSection}>
                    <Image
                        // source={
                        //     selectedMeta[item.id]
                        //         ? { uri: selectedMeta[item.id] }
                        //         : profileImages[item.id]
                        //             ? { uri: profileImages[item.id] }
                        //             : require('../../../assets/images/food.jpg')
                        // }
                        source={UserProfiles}
                        style={styles.profileImage}
                        resizeMode="cover"
                    />
                    <TouchableOpacity
                        onPress={() => pickMedia(item.id)}
                        style={styles.pickButton}
                    >
                        <Text style={styles.buttonText}>Pick Image</Text>
                    </TouchableOpacity>
                   
                </View>

               
            </View>

        )

    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            <View style={styles.saveAllContainer}>
                <Button
                    title="Save All Changes"
                    onPress={infoSave}
                    buttonStyle={styles.saveAllButton}
                    titleStyle={styles.saveAllButtonText}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    listContent: {
        padding: 10,
    },
    profileContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    imageSection: {
        alignItems: 'center',
        marginBottom: 15,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    pickButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
        marginBottom: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    imageSaveButton: {
        backgroundColor: '#34C759',
        paddingHorizontal: 15,
    },
    infoSection: {
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingTop: 15,
    },
    profileTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    saveAllContainer: {
        padding: 15,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    saveAllButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        borderRadius: 8,
    },
    saveAllButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default EditProfile;


