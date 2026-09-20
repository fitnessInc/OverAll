import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Modal, FlatList, Alert } from 'react-native';
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
    const [Full_Name, setFull_Name] = useState(infoProfiles?.full_Name || '');
    const [Email, setEmail] = useState(infoProfiles?.email);
    const [Certification, setCertification] = useState(infoProfiles?.certification || '');
    const [Function, setFunction] = useState(infoProfiles?.function || '');
    // const [combinedProfiles, setCombinedProfiles] = useState([])

    //  USESELECTOR SECTION
    const profileImages = useSelector(state => state.image.profiles[profileId] || {});
    console.log('ProfileImages:', profileImages)
    const infoProfiles = useSelector(state => state.info.infoPro[profileId] || {});
    console.log('infoProfiles:', infoProfiles);
    // const metadata = useSelector(state => state.meta.metaPro[profileId] || {});
    // console.log('metadata', metadata);

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

        if (result.canceled || !result.assets?.length) {

            return;
        }

        const asset = result.assets[0]


        const objectInstance = new FormData()
        objectInstance.append('avatar', {

            uri: asset.uri,
            name: asset.fileName,
            type: asset.mimeType,

        });
        // append is method that that add key,value pair to the  insttanceObject create  from FromData()
        objectInstance.append("title", asset.fileName || "untitled");

        try {
            const request = await fetch(`http://192.168.1.173:3000/upload/user/${profileId}`, {
                method: 'POST',
                body: objectInstance,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log('Uploading for profileId:', profileId);

            const data = await request.json();

            if (data.success) {
                dispatch(setProfileMeta({
                    id: profileId,
                    newImage: data.url

                }))

            } else {
                console.log('Upload failed:', data.message);
            }
        } catch (e) {
            console.log('Upload error:', e);
        }





    };



    const addMeta = async (profileId) => {
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
        // if condition means if result is canceld=true or no asset is true then stop the function 
        if (result.canceled || !result.assets?.length) {
            return;
        }
        //  here down if the above  the if condition is false  meaning  the result is not canceled and result is true 
        // then execute the below blog if  the code 
        const asset = result.assets[0];
        const Video = asset.type === "video";
        const assetFile = Video ? 'video' : 'photo';
        //  new objectInstance is the instance object of FormData() it means copy of   FormDtata()  constructor 
        const objectInstance = new FormData()
        objectInstance.append(assetFile, {

            uri: asset.uri,
            name: asset.fileName || `upload_${Date.now()}.${Video ? 'mp4' : 'jpg'}`,
            type: asset.mimeType || (Video ? 'video/mp4' : 'image/jpeg'),

        });
        // append is method that that add key,value pair to the  instanceObject create  from FromData()
        objectInstance.append("title:", asset.fileName || "untitle");

        try {
            const request = await fetch(`http://192.168.1.173:3000/upload/user/${profileId}`, {
                method: 'POST',
                body: objectInstance,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log('Uploading for profileId:', profileId);

            const data = await request.json();

            if (data.success) {
                console.log('Upload success:', data);
                // no need to dispatch anything — gallery screen refetches automatically via useFocusEffect on return
            } else {
                console.log('Upload failed:', data.message);
            }
        } catch (e) {
            console.log('Upload error:', e);
        }






    }

    // EVENT TO SAVE INFO-PROFILE

    const newData = {
        full_Name: Full_Name,        // map local state to the correct backend field name
        certification: Certification,
        function: Function,
    }




    const infoSave = async () => {

        try {
            const request = await fetch(`http://192.168.1.173:3000/profiles/${profileId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData),

            })
            const data = await request.json()
            if (request.ok) {
                console.log('bio updated:', data);

                navigation.navigate('ProfilesTab', { screen: 'Profiles' })
            } else {
                console.log("bio update faild:", data)
            }
        } catch (e) {
            console.log(e)
        }


    };

    const deleteAvatar = async () => {

        try {

            const request = await fetch(`http://192.168.1.173:3000/profiles/${profileId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ avatar: { url: null, thumbnail: null } })


            });
            const data = await request.json();
            if (request.ok) {
                console.log("avatar is wiped !!!!:", data)
                dispatch(setProfileMeta({ id: profileId, newImage: null }));

            } else {
                console.log(" delete avatar faild Oups!!!:", data)

            }

        } catch (e) {
            console.log(e)
        }

    }

    const handleAvatar = async () => {

        Alert.alert(
            " your are deleting avatar",
            "do  you want  tro do it ",
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Remove', style: 'destructive', onPress: deleteAvatar }
            ]

        )

    }






    const profileImage = profileData?.profileImage || profileImages?.uri || profileImages;

    const combinedProfiles = [{
        id: profileId,
        full_Name: infoProfiles.full_Name || Full_Name,
        certification: infoProfiles.certification || Certification,
        function: infoProfiles.function || Function,
        email: infoProfiles.email || Email,
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
                        onPress={() => pickMedia(profileId)}
                        style={styles.pickButton}
                    >
                        <Text style={styles.buttonText}>Pick Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleAvatar} style={styles.pickButton}>
                        <Text style={styles.buttonText}>DELETE</Text>
                    </TouchableOpacity>

                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your full name"
                        placeholderTextColor="#999"
                        onChangeText={setFull_Name}
                        value={Full_Name}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your certification if you have"
                        placeholderTextColor="#999"
                        onChangeText={setCertification}
                        value={Certification}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your function"
                        placeholderTextColor="#999"
                        onChangeText={setFunction}
                        value={Function}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor="#999"
                        onChangeText={setEmail}
                        value={Email}
                    />
                </View>
                <View style={{ marginTop: 6 }}>
                    <Button
                        title="ADD Gallery Media"
                        onPress={() => addMeta(profileId)}
                    />
                </View>
                <View style={{ marginTop: 6 }}>
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
                    onPress={() => infoSave(profileId)}
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


