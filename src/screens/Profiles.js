import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { ListItem, Avatar, Button } from 'react-native-elements'
// import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

import * as ImagePicker from 'expo-image-picker';




const data = [
    {
        id: '3',
        Name: "nanito",
        subTitle: 'trainer',
        uri: "null"


    },
    {
        id: '4',
        Name: "Mouna",
        subTitle: 'trainer',
        uri: "null"

    },
    {
        id: '5',
        Name: "tonton",
        subTitle: 'trainee',
        uri: "null"

    },
]







const Profiles = () => {
    const [avatars, setAvatars] = useState(data);
    const ItemSeparatorComponent = () => <View style={{}} />

    const Pickimage = async (id) => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;

        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const newData = avatars.map(item => {
                if (item.id === id) {
                    // return { ...item, uri: result.assets[0].uri };
                    return { ...item, uri: result.uri };
                }
                  console.log(result)
                return(
                    item
                    
                ) 
                
            });
            setAvatars(newData);
        }
    };


       
    


   

    




    const renderItem = ({ item }) => (



        <ListItem
            bottomDivider
            style={{color:'green'}}

        >
            <TouchableOpacity onPress={() => Pickimage(item.id)}>
                {avatars[item.id] ? (
                    <Image source={avatars[item.id]} style={styles.avatar} />
                ) : (
                    <Avatar
                        size="medium"
                        icon={{ name: 'person', type: 'material', color: 'white' }}
                        overlayContainerStyle={{ backgroundColor: 'black' }}
                        rounded

                    />
                )}
            </TouchableOpacity>
            <ListItem.Content>
                <ListItem.Title>{item.Name}</ListItem.Title>
                <ListItem.Title>{item.subTitle}</ListItem.Title>
            </ListItem.Content>
          
        </ListItem>


    )




    return (
        <SafeAreaView
            style={{ flex: 1, marginTop:70}}
        >
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemSeparatorComponent}



            />
        </SafeAreaView >

    )




}


const styles = StyleSheet.create({

    avatar: {
        width: 50,
        height: 50,
    },











});




export default Profiles