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

const data = [
    {
        id: '1',
        Full_Name: 'nanito',
        Address: 'xxx',
        Function: 'Calisthenics',
        Certification: ' Nasam',
        meta: null


    },
    {
        id: '2',
        Full_Name: 'Aicha Ahmat',
        Address: ' Address: 646 berge ave NJ',
        Function: '  weight trainer ',
        Certification: 'Nasam',
        meta: null


    },
    {
        id: '3',
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






const EditProfile = ({ item }) => {

    const [selectedMeta, setSelectedMeta] = useState("");
    const dispatch = useDispatch();
    const [text, setText] = useState({});




    const imageUri = useSelector(state => state.image.image)


    const pickMedia = async () => {
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
            setSelectedMeta(result.assets[0].uri);
            dispatch(setProfileMeta(setSelectedMeta));
        }
    };





    const saveProfile = () => {
        dispatch(setProfileMeta({ ...item, meta: selectedMeta }))

    };
    const infoSave = (id) => {
        const updateInfo = text[id];
        if (updateInfo) {
            console.log(id)

        }

    }
    const renderItem = ({ item }) => (
        <View style={styles.info}>
            <TextInput
                editable
                value={text[item.id]?.Full_Name || ''}
                onChange={(value) =>
                    setText((prev) => ({
                        ...prev,
                        [item.id]: { ...prev[item.id], Full_Name: value }
                    }))
                }
                placeholder="Full-Name"
                style={styles.input}

            />
            <TextInput
                editable
                value={text[item.id]?.address || ''}
                onChange={(value) =>
                    setText((prev) => ({
                        ...prev,
                        [item.id]: { ...prev[item.id], address: value }
                    }))
                }

                placeholder="address"
                style={styles.input}
            />
            <TextInput
                editable
                value={text[item.id]?.Certification || ''}
                onChange={(value) =>
                    setText((prev) => ({
                        ...prev,
                        [item.id]: { ...prev[item.id], Certification: value }
                    }))
                }

                placeholder="Certification"
                style={styles.input}
            />
            <TextInput
                editable
                value={text[item.id]?.Function || ''}
                onChange={(value) =>
                    setText((prev) => ({
                        ...prev,
                        [item.id]: { ...prev[item.id], Function: value }
                    }))
                }

                placeholder="Function"
                style={styles.input}
            />
            <TouchableOpacity
                onPress={() => infoSave(item.id)}
                style={styles.saveButton}
            >
                <Text style={styles.texta}>SaveInfo</Text>

            </TouchableOpacity>

        </View>



    )


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ width: '100%', height: 300, alignItems: 'center', alignContent: 'center' }}>
                <Image
                    source={selectedMeta ? { uri: selectedMeta } : require('../../../assets/images/food.jpg')}
                    // style={styles.image}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                />
                <TouchableOpacity onPress={pickMedia} style={{ marginTop: -117, }}>
                    <Text style={styles.texto}>Pick an Image or Video</Text>
                </TouchableOpacity>
                <Button title="Save Changes" onPress={saveProfile} />

            </View>
            <View style={{ height: 180, marginTop: 50 }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}


                />
            </View>

        </SafeAreaView >
    )

};


const styles = StyleSheet.create({



    text: {
        fontSize: 25,
        fontWeight: "bold",
        fontStyle: "italic",
        fontWeight: 'bold'
    },

    info: {
        alignContent: 'left',
        alignItems: 'left',
        marginTop: "80"

    },
    texto: {

        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "italic",
        fontWeight: 'condensed',
        textAlign: 'center',
        lineHeight: 50,
        textDecorationStyle: "dotte",
        textShadowColor: 'white',
        paddingTop: 100



    },
    input: {
        borderRadius: 10,
        fontSize: 'bold',
        borderColor: 'black',
        fontStyle: "italic",
        fontWeight: 'condensed',
        textAlign: 'center',
        padding: 3,
        borderWidth: 1,


    },
    texta: {

        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "italic",
        fontWeight: 'condensed',
        textAlign: 'center',
        lineHeight: 50,
        textDecorationStyle: "dotte",
        textShadowColor: 'white',
        paddingTop: 115



    },


    container: {
        flex: 1,
        margin: 8,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        overflow: 'hidden',

    },
    ex: {
        fontSize: 15,
        fontWeight: "bold",
        fontStyle: "italic",
        fontWeight: 'condensed'


    },



    saveButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },

    saveButtonText: {
        color: 'blue',
        fontWeight: 'bold',
    },


});

export default EditProfile;