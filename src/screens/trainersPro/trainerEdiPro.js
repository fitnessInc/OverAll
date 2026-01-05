import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Modal, FlatList} from 'react-native';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ListItem, Button } from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';
import { Video } from "expo-av";
import { useSelector, useDispatch } from "react-redux";
import { setProfileMeta, clearProfileMeta } from "../../../redux/slices/imageSlice";
import { metaProfile } from "../../../redux/slices/videoSlice";
import { updateInfoPro } from "../../../redux/slices/infoSlice";
import Pro from "./profileOne";
import { useRoute, useNavigation } from "@react-navigation/native";
import { combineReducers, isImmutableDefault } from "@reduxjs/toolkit";




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


const EditPro = (prop) => {

    // const safeParams = route?.params?.params || {};
    const navigation = useNavigation();
    const route = useRoute();
    console.log('routeObject', route)
    const dispatch = useDispatch();
    const { profileId, profileData } = route.params || {};
    console.log('profileId:', profileId);
    console.log('profileData', profileData);

    // useState Hook  Section
    const [Full_Name, setFull_Name] = useState('infoProfiles?.Full_Name');
    const [Address, setAddress] = useState('infoProfiles?.Address');
    const [Certification, setCertification] = useState('infoProfiles?.Certification');
    const [Function, setFunction] = useState('infoProfiles?.Function');
    // const [combinedProfiles, setCombinedProfiles] = useState([])

    //  USESELECTOR SECTION
    const profileImages = useSelector(state => state.image.profiles[profileId] || {});
    console.log('ProfileImages:', profileImages)
    const infoProfiles = useSelector(state => state.info.infoPro[profileId] || {});
    console.log('infoProfiles:', infoProfiles);
    const metadata = useSelector(state => state.meta.metaPro[profileId] || {});
    console.log('metadata', metadata);

    //METADATAPICKER






    const pickMedia = async (profileId) => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access media library is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            // mediaTypes: ImagePicker.MediaType,
            MediaTypeOptions: 'All', 
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets?.length > 0) {
            const metaUri = result.assets[0].uri;

            dispatch(setProfileMeta({
                id: profileId,
                newImage: metaUri
            }))
        }
    };

    const addMeta= async(profileId)=>{
         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access media library is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            MediaTypeOptions: 'All', 
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets?.length > 0) {
            const metaUri = result.assets[0].uri;

            dispatch(metaProfile({
                id: profileId,
                newMeta: metaUri
            }))
        }

    }

    // EVENT TO SAVE INFO-PROFILE

    const newData = {
        Full_Name,
        Address,
        Certification,
        Function
    }




    const infoSave = () => {

        dispatch(updateInfoPro({ id: profileId, newData }))


        navigation.navigate('ProfilesTab', {
            screen: 'Profiles',

        });




    };






    const profileImage = profileData?.profileImage || profileImages?.uri || profileImages;

    const combinedProfiles = [{
        id: profileId,
        Full_Name: infoProfiles.Full_Name || Full_Name, // Fallback to local state
        Address: infoProfiles.Address || Address,
        Function: infoProfiles.Function || Function,
        Certification: infoProfiles.Certification || Certification,
        profileImage
    }];





    const renderItem = ({ item }) => {



        return (
            <View style={styles.profileContainer}>
                {/* Profile Image Section */}
                <View style={styles.imageSection}>
                    <Image
                        source={{ uri: item.profileImage }}
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
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={setFull_Name}
                        value={Full_Name}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setAddress}
                        value={Address}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setCertification}
                        value={Certification}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setFunction}
                        value={Function}
                    />
                </View>
                <View>
                <Button
                    title="ADD PROFILE MEDIA"
                    onPress={addMeta}
                />
            </View>
            <View style={{marginTop:6}}>
                <Button
                    title="ADD PROFILE LIVE MEDIA"
                    onPress={addMeta}
                />
            </View>
            <View style={{marginTop:6}}>
                <Button
                    title="DELET PROFILE MEDIA"
                    onPress={() => alert('Simple Button pressed')}
                />
            </View>
            </View >

        )

    };
// RETURN
return (
    <SafeAreaView style={styles.container}>
        <FlatList
            data={combinedProfiles}
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
    input: {
        padding: 10,
        borderColor: '#000',
        borderWidth: 1,
        margin: 12,
    },
});

export default EditPro;


