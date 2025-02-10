import React, { useState } from "react";
import { View, Text,Pressable, Image, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Modal, FlatList,Button } from 'react-native';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ListItem ,Icon} from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';





const ScreenWidth = Dimensions.get('window').width;
const Width = Math.round(ScreenWidth * 1);
const ScreenHeight = Dimensions.get("window").height;
const Height = Math.round(ScreenHeight * 0.3);





const EditProfile = ({ route, navigation }) => {

    const { item } = route.params;
    
    const [image, setImage] = useState(item.url);
    const [semiModal, setsemiModal] = useState(null)

    const openMod = () => {
        setsemiModal(true)

    };
    const closeMod = () => {
        setsemiModal(false)
    }

    const onSubmit = () => {
        navigation.goBack();

    };
    const PickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        };
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }



    };


    const PickImageCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult === false) {
            alert('Permission to access camera isrequired');
            return;

        };
        const Result = await ImagePicker.launchCameraAsync({

            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,

        });

        if (!Result.canceled) {
            setImage(Result.assets[0].uri);
        }


    }


    return (
        <SafeAreaView>
            <View>
                <View>
                    <Pressable onPress={openMod}>
                        <Image
                         source={{uri:image}}
                         style={styles.image}
                        />
                    </Pressable>
                </View>
                <Modal
                    visible={semiModal}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={closeMod}
                >
                    <View>
                        <ListItem battomDivider>
                            <ListItem.Content>
                                <ListItem.Title>Select Profile Image</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem onPress={PickImage} bottomDivider>
                            <Icon name='image' />
                            <ListItem.Content>
                                <ListItem.Title>choose from gallery</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem onPress={PickImageCamera} bottomDivider>
                            <Icon name="camera" />
                            <ListItem.Content>
                                <ListItem.Title>Take a Picture</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        <Button title="Close" onPress={() => setsemiModal(false)} />
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )

};


const styles = StyleSheet.create({


    image: {
      resizeMode: 'cover',
      width: Width,
      height: Height,
      borderRadius: 25,
  
    },
});

export default EditProfile;