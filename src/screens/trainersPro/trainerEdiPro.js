import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Image, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Modal, FlatList, } from 'react-native';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ListItem, Button } from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';
import { Video } from "expo-av";

const data = [
    {
        id: '1',
        Full_Name: 'nanito Nanitosse',

        Address: 'inconito',
        Function: 'Calisthenics',
        Certification: ' Certification: Nasam',
        meta: null



    },
    {
        id: '2',
        Full_Name: 'Aicha Ahmat',

        Address: ' Address: 646 berge ave NJ',
        Function: ' body weight trainer ',
        Certification: 'Nasam',
        meta: null


    },
    {
        id: '3',
        Full_Name: 'Alato Sow',
        Address: ' Address: 646 berge ave NJ',
        Function: ' weight trainer ',
        Certification: 'Certification: Nasam',
        meta: null


    },
];






const EditProfile = ({ navigation, item }) => {

    const [selectedMeta, setSelectedMeta] = useState("");


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
        }
      };
        



    
    const saveProfile = () => {
        navigation.navigate('Pro', { item: { ...item, meta: selectedMeta } });
        navigation.navigate('Profiles', { item: { ...item, meta: selectedMeta } });

    };
    const renderItem = ({ item }) => (




        <ListItem bottomDivider onPress={() => navigation.navigate('Profiles', { item })} >
            <ListItem.Content>
                <ListItem.Title>{item.Full_Name}</ListItem.Title>
                <ListItem.Title>{item.Function}</ListItem.Title>
                <ListItem.Title>{item.Certification}</ListItem.Title>
            </ListItem.Content>
        </ListItem>


    )



    return (
        <SafeAreaView>
            <View style={{ width: '100%', height:300, alignItems:'center', alignContent:'center'}}>
                <Image
                    source={selectedMeta ? { uri: selectedMeta } : require('../../../assets/images/food.jpg')}
                    // style={styles.image}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                />
                <TouchableOpacity onPress={pickMedia} style={{ 
                    marginTop:-80,
                    
                }}>
                    <Text style={styles.texto}>Pick an Image or Video</Text>
                </TouchableOpacity>
                <Button title="Save Changes" onPress={saveProfile} />

                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer} 
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
        alignItems: 'center',
        paddingTop: 20,
        width:'100%',
        height:250
    },
    listContainer: { paddingBottom: 20 }

});

export default EditProfile;