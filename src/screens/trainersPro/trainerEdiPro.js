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

const data = [
    {
        id: 'user1',
        Full_Name: 'nanito',
        Address: 'xxx',
        Function: 'Calisthenics',
        Certification: ' Nasam',
        meta: null


    },
    {
        id: 'user2',
        Full_Name: 'Aicha Ahmat',
        Address: ' Address: 646 berge ave NJ',
        Function: '  weight trainer ',
        Certification: 'Nasam',
        meta: null


    },
    {
        id: 'user3',
        Full_Name: 'Alato Sow',
        Address: ' Address: 646 berge ave NJ',
        Function: ' weight trainer ',
        Certification: 'Nasam',
        meta: null


    },
];

const ScreenWidth = Dimensions.get('window').width;
const Width = Math.round(ScreenWidth * 1);
const ScreenHeight = Dimensions.get("window").height;
const Height = Math.round(ScreenHeight * 0.3);
// const EditProfile = ({ item, navigation }) => {

//     const [selectedMeta, setSelectedMeta] = useState("");
//     const dispatch = useDispatch();
//     const [text, setText] = useState({});




//     const imageUri = useSelector(state => state.image.profile);
//     const profiles = useSelector(state => state.info.infoPro); 


//     const pickMedia = async () => {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== 'granted') {
//             alert('Permission to access media library is required!');
//             return;
//         }

//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.All,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//         });

//         if (!result.canceled && result.assets?.length > 0) {
//             setSelectedMeta(result.assets[0].uri);
//             // dispatch(setProfileMeta(setSelectedMeta));
//         }
//     };





//     const saveProfile = () => {
//         // dispatch(setProfileMeta({ ...item, meta: selectedMeta }))
//         // dispatch(setProfileMeta({ ...item, meta: selectedMeta }))
//         dispatch(setProfileMeta(result.assets[0].uri))

//     };






//     const infoSave = () => {

//         Object.entries(text).forEach(([id,newData])=>{
//             dispatch(updateInfoPro({id,newData}))
//         });

//         const [itemId,newData] = Object.entries(text)[0]





//           navigation.navigate('Pro',{itemId});

//           setTimeout(()=>{
//             navigation.navigate('Profiles',{itemId})
//           },600);



//     }


//     const renderItem = ({ item }) => (
//         <View style={styles.info}>
//             <TextInput
//                 editable
//                 value={text[item.id]?.Full_Name || ''}
//                 onChangeText={(value) =>
//                     setText((prev) => ({
//                         ...prev,
//                         [item.id]: { ...prev[item.id], Full_Name: value }
//                     }))
//                 }
//                 placeholder="Full-Name"
//                 style={styles.input}

//             />
//             <TextInput
//                 editable
//                 value={text[item.id]?.address || ''}
//                 onChangeText={(value) =>
//                     setText((prev) => ({
//                         ...prev,
//                         [item.id]: { ...prev[item.id], address: value }
//                     }))
//                 }

//                 placeholder="address"
//                 style={styles.input}
//             />
//             <TextInput
//                 editable
//                 value={text[item.id]?.Certification || ''}
//                 onChangeText={(value) =>
//                     setText((prev) => ({
//                         ...prev,
//                         [item.id]: { ...prev[item.id], Certification: value }
//                     }))
//                 }

//                 placeholder="Certification"
//                 style={styles.input}
//             />
//             <TextInput
//                 editable
//                 value={text[item.id]?.Function || ''}
//                 onChangeText={(value) =>
//                     setText((prev) => ({
//                         ...prev,
//                         [item.id]: { ...prev[item.id], Function: value }
//                     }))
//                 }

//                 placeholder="Function"
//                 style={styles.input}
//             />



//         </View>



//     );
//     const profileArray = Object.values(profiles)


//     return (
//         <SafeAreaView style={{ flex: 1 }}>
//             <View style={{ width: '100%', height: 300, alignItems: 'center', alignContent: 'center' }}>
//                 <Image
//                     // source={selectedMeta ? { uri: selectedMeta } : require('../../../assets/images/food.jpg')}
//                     source={selectedMeta? { uri: selectedMeta} : require('../../../assets/images/food.jpg')}
//                     // style={styles.image}
//                     style={{ width: '100%', height: '100%' }}
//                     resizeMode="cover"
//                 />
//                 <TouchableOpacity onPress={pickMedia} style={{ marginTop: -117, }}>
//                     <Text style={styles.texto}>Pick an Image or Video</Text>
//                 </TouchableOpacity>
//                 <Button title="Save Changes" onPress={saveProfile} />

//             </View>
//             <View style={{ height: 180, marginTop: 50 }}>
//                 <FlatList
//                     data={data}
//                     renderItem={renderItem}
//                     keyExtractor={(item) => item.id.toString()}
//                     contentContainerStyle={{ paddingBottom: 50 }}

//                 />
//             </View>
//             <View>
//             <Button   onPress={infoSave} style={styles.saveButton}>
//                 <Text  style={styles.texto}>Save INfo</Text>
//             </Button>
//             </View>
//         </SafeAreaView >
//     )

// };


// const styles = StyleSheet.create({



//     text: {
//         fontSize: 25,
//         fontWeight: "bold",
//         fontStyle: "italic",
//         fontWeight: 'bold',
//     },

//     info: {
//         alignContent: 'left',
//         alignItems: 'left',
//         marginTop: "80"

//     },
//     texto: {

//         fontSize: 20,
//         fontWeight: "bold",
//         fontStyle: "italic",
//         fontWeight: 'condensed',
//         textAlign: 'center',
//         lineHeight: 50,
//         textDecorationStyle: "dotte",
//         textShadowColor: 'white',
//         paddingTop: 100



//     },
//     input: {
//         borderRadius: 10,
//         fontSize: 'bold',
//         borderColor: 'black',
//         fontStyle: "italic",
//         fontWeight: 'condensed',
//         textAlign: 'center',
//         padding: 3,
//         borderWidth: 1,


//     },
//     texta: {

//         fontSize: 20,
//         fontWeight: "bold",
//         fontStyle: "italic",
//         fontWeight: 'condensed',
//         textAlign: 'center',
//         lineHeight: 50,
//         textDecorationStyle: "dotte",
//         textShadowColor: 'white',
//         paddingTop: 115



//     },


//     container: {
//         flex: 1,
//         margin: 8,
//         backgroundColor: '#f8f8f8',
//         borderRadius: 8,
//         overflow: 'hidden',

//     },
//     ex: {
//         fontSize: 15,
//         fontWeight: "bold",
//         fontStyle: "italic",
//         fontWeight: 'condensed'


//     },



//     saveButton: {
//         backgroundColor: 'blue',
//         padding: 10,
//         borderRadius: 5,
//         marginTop: 10,
//         alignItems: 'center',
//         color:"blue"
//     },

//     saveButtonText: {
//         color: 'blue',
//         fontWeight: 'bold',
//         textAlign:"center",

//     },


// });

// export default EditProfile;
const EditProfile = ({ navigation, route }) => {
    //   const [selectedMeta, setSelectedMeta] = useState({}); // Store images by ID
    //   const [text, setText] = useState({});
    const dispatch = useDispatch();
    const { profileId, profileData } = route.params;

    // Get data from Redux
    const profileImages = useSelector(state => state.image.profiles);
    console.log('image profile', profileImages)
    const infoProfiles = useSelector(state => state.info.infoPro);
    console.log('info',infoPro)

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
                meta: metaUri
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
                    {/* <Button
                        title="Save Image"
                        onPress={() => saveProfile(item.id)}
                        buttonStyle={styles.imageSaveButton}
                    /> */}
                </View>

                {/* Profile Info Section */}
                {/* <View style={styles.infoSection}>
                    <Text style={styles.profileTitle}>Editing Profile: {item.id}</Text>

                    <TextInput
                        value={text[item.id]?.Full_Name || item.Full_Name}
                        onChangeText={(value) =>
                            setText(prev => ({
                                ...prev,
                                [item.id]: { ...prev[item.id], Full_Name: value }
                            }))
                        }
                        placeholder="Full Name"
                        style={styles.input}
                    />

                    <TextInput
                        value={text[item.id]?.Address || item.Address}
                        onChangeText={(value) =>
                            setText(prev => ({
                                ...prev,
                                [item.id]: { ...prev[item.id], Address: value }
                            }))
                        }
                        placeholder="Address"
                        style={styles.input}
                    />

                    <TextInput
                        value={text[item.id]?.Function || item.Function}
                        onChangeText={(value) =>
                            setText(prev => ({
                                ...prev,
                                [item.id]: { ...prev[item.id], Function: value }
                            }))
                        }
                        placeholder="Function"
                        style={styles.input}
                    />

                    <TextInput
                        value={text[item.id]?.Certification || item.Certification}
                        onChangeText={(value) =>
                            setText(prev => ({
                                ...prev,
                                [item.id]: { ...prev[item.id], Certification: value }
                            }))
                        }
                        placeholder="Certification"
                        style={styles.input}
                    />
                </View> */}
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


