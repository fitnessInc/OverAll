import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, Image, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Modal, FlatList, Alert, ActivityIndicator } from 'react-native';
import { ListItem, Button } from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';
import { Video } from "expo-av";
import { useSelector, useDispatch } from "react-redux";
import { setProfileMeta, clearProfileMeta } from "../../../redux/slices/imageSlice";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import { authFetch } from "../../../firebase/authFetch";
import useDeleteAccount from "../../components/deleteAccount";






const ScreenWidth = Dimensions.get('window').width;
const Width = Math.round(ScreenWidth * 1);
const ScreenHeight = Dimensions.get("window").height;
const Height = Math.round(ScreenHeight * 0.3);


const EditPro = (prop) => {

    const { confirmDeleteAccount, loading } = useDeleteAccount()


    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const { profileId, profileData } = route.params ?? {};


    // useState Hook  Section
    const [form, setForm] = useState({
        full_Name: '',
        certification: '',
        function: '',
        phoneNumber: '',


    });
    const [loaded, setLoaded] = useState(false);
    const [avatarUri, setAvatarUri] = useState(null);





    //METADATAPICKER

    const pickMedia = async () => {


        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access media library is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({

            MediaTypeOptions: ImagePicker.MediaType.Images,
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
            name: asset.fileName || `avatar_${Date.now()}.jpg`,
            type: asset.mimeType || 'image/jpeg',

        });
        // append is method that that add key,value pair to the  insttanceObject create  from FromData()
        objectInstance.append("title", asset.fileName || "untitled");

        try {


            const request = await authFetch('/upload/me/media', {
                method: 'POST',
                body: objectInstance,

            })
            console.log('Uploading for profileId:', profileId);

            const data = await request.json();

            if (data.success) {
                setAvatarUri(data.url);

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
            mediaTypes: ImagePicker.MediaTypeOptions.All,
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

            title: asset.fileName || 'untitled',
            uri: asset.uri,
            name: asset.fileName || `upload_${Date.now()}.${Video ? 'mp4' : 'jpg'}`,
            type: asset.mimeType || (Video ? 'video/mp4' : 'image/jpeg'),

        });
        // append is method that that add key,value pair to the  instanceObject create  from FromData()
        objectInstance.append("title:", asset.fileName || "untitle");

        try {
            const request = await authFetch(`/upload/me/media`, {
                method: 'POST',
                body: objectInstance,

            })

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

    useFocusEffect(
        useCallback(() => {
            let active = true;
            (async () => {
                try {
                    const request = await authFetch('/profiles/me');
                    const data = await request.json();
                    if (active && data.success) {
                        const d = data.profile;
                        setAvatarUri(d.avatar?.uri ?? null);
                        setForm({
                            full_Name: d.full_Name ?? '',
                            email: d.email ?? '',
                            certification: d.certification ?? '',
                            function: d.function ?? '',
                        });
                        setLoaded(true);
                    }
                } catch (e) {
                    console.log('load profile error:', e);
                }
            })();
            return () => { active = false; };
        }, [])
    );




    const infoSave = async () => {

        try {
            const request = await authFetch('/profiles/me', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),

            })
            const data = await request.json()
            if (data.success) {

                navigation.goBack()
            } else {
                console.log("bio update faild:", data)
            }
        } catch (e) {
            console.log('erro in the update data:', e)
        }


    };

    const deleteAvatar = async () => {

        try {

            const request = await authFetch('profiles/me', {
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





    const combinedProfiles = [{
        id: 'me',                        // any stable string; the FlatList only needs a key
        full_Name: form.full_Name,
        certification: form.certification,
        function: form.function,
        email: form.email,
        profileImage: avatarUri,
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
                        onPress={pickMedia}
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
                        value={form.full_Name}
                        onChangeText={(t) => setForm(prev => ({ ...prev, full_Name: t }))}

                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your certification if you have"
                        placeholderTextColor="#999"
                        onChangeText={(t) => setForm(prev => ({ ...prev, certification: t }))}
                        value={form.certification}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your function"
                        placeholderTextColor="#999"
                        onChangeText={(t) => setForm(prev => ({ ...prev, function: t }))}
                        value={form.function}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor="#999"
                        onChangeText={(t) => setForm(prev => ({ ...prev, email: t }))}
                        value={form.email}
                    />
                </View>
                <View style={{ marginTop: 6 }}>
                    <Button
                        title="ADD Gallery Media"
                        onPress={() => addMeta(profileId)}
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
                <TouchableOpacity onPress={confirmDeleteAccount}
                    disabled={loading}
                    style={{
                        backgroundColor: 'red',
                        padding: 10,
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom:40

                    }}>
                    {
                        loading ? (
                            <ActivityIndicator color="#ef4444" />) :
                            (<Text className="text-white-800 text-base">DELETE ACCOUNT</Text>)
                    }

                </TouchableOpacity>

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


