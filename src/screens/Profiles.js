import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ListItem, Avatar, Button } from 'react-native-elements'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';




const data = [
    {
        id: '1',
        Name: "nanito",
        subTitle: 'trainer',
        uri: "null"


    },
    {
        id: '2',
        Name: "Mouna",
        subTitle: 'trainer',
        uri: "null"

    },
]







const Profiles = () => {
    const [avatars, setAvatars] = useState(data);

        const chooseImage = (id) => {
            const options = {
                mediaType: 'photo',
                quality: 1,
                saveToPhotos: true
            };

            launchImageLibrary(options, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorCode) {
                    Alert.alert('Error', response.errorMessage);
                } else {
                    const source = { uri: response.assets[0].uri };
                    setAvatars((prev) => ({ ...prev, [id]: source }));
                }
            });
        };


      const takePhoto = (id) => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };
        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.errorCode) {
                Alert.alert('Error', response.errorMessage);
            } else {
                const source = { uri: response.assets[0].uri };
                setAvatars((prev) => ({ ...prev, [id]: source }));
            }
        });

      } 




        const renderItem = ({ item }) => (
            <ListItem bottomDivider>
                <TouchableOpacity onPress={() => chooseImage(item.id)}>
                    {avatars[item.id] ? (
                        <Image source={avatars[item.id]} style={styles.avatar} />
                    ) : (
                        <Avatar
                            size="large"
                            icon={{ name: 'person', type: 'material', color: 'white' }}
                            overlayContainerStyle={{ backgroundColor: 'grey' }}

                        />
                    )}
                </TouchableOpacity>
                <ListItem.Content>
                    <ListItem.Title>{item.Name}</ListItem.Title>
                    <ListItem.Title>{item.subTitle}</ListItem.Title>
                </ListItem.Content>
                <Button title="Photo" onPress={() => takePhoto(item.id)} />
            </ListItem>
        );

        return (
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
    )


   
}

const styles = StyleSheet.create({
    avatar: {
        width: 40,
        height: 40,

    },
});

export default Profiles