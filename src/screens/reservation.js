import { Text, View, Modal, StyleSheet, Alert, Image } from "react-native"
import { useState } from "react";
import { Input, Button, Icon } from "react-native-elements";
import * as MailComposer from 'expo-mail-composer';
import * as ImagePicker from 'expo-image-picker';
import glogo from '../../assets/images/glogo.jpg';
import *as ImageManipulator from 'expo-image-manipulator';

const LoggingScreen = () => {
    const [modal, setModal] = useState(false);
    const [name, setNAme] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [imageUrl, setImageUrl] = useState( 'images/glogo.jpg');

    const processImage = async (imgUri) => {
        const image = await ImageManipulator.manipulateAsync(
            imgUri,
            [{ resize: { width: 400 } }],
            { format: ImageManipulator.SaveFormat.PNG }


        );

        setImageUrl(image.uri);

        console.log(processImage)



    }
    const getImageFromGallery = async () => {
        const mediaLibraryPermissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(mediaLibraryPermissions.status==='granted'){
            const  capturedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1]
            });

            if(!capturedImage.canceled){
                console.log(capturedImage);
    
                processImage(capturedImage.uri);
            }


        }

       
    }

    const sendMail = () => {
        MailComposer.composeAsync({
            recipients: ['nanitosse@gmail.com'],
            subject: 'Inquiry',
            body: 'To whom it may concern:'

        });
    }

    const print = () => {
        Alert.alert('pleas enter your contact')

    }

    const resetForm = () => {
        setNAme(''),
            setPhone('')
        setEmail('')
        setAddress('')
    }
    const handelSubmit = () => {
        console.log({
            Name: name,
            Phone: phone,
            Email: email,
            Address: address


        })



    }
    const getImageFromCamera = async () => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraPermission.status === 'granted') {
            const capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1]

            });
            if (!capturedImage.canceled) {
                console.log(capturedImage);
              
                processImage(capturedImage.uri);
            }

        }
    }

    return (
        <View style={styles.centeredView}>

            <View style={{ marginBottom: 4, }}>
                <Text>Press the Button to Open the Registration  Form</Text>
                <Button
                    onPress={() => setModal(true)}
                    // style={styles.hide}
                    title='OPEN'
                    style={styles.hide}
                />
            </View>
            <Modal

                animationType="slide"
                visible={modal}
                transparent={true}
                onShow={() => print()}
            >
                <View style={{ backgroundColor: 'transparent', flex: 1 }}>
                    <View style={{ backgroundColor: 'white', borderRadius: 10, flex: 1, marginTop: -105 }}>
                        <View style={{ marginTop: 90 }}>
                            <Image
                                source={{ uri: imageUrl }}
                                loadingIndicatorSource={glogo}
                                style={{ marginTop: 90, width: 70, height: 70 }}
                            />
                            <Button
                                title="Camera" onPress={getImageFromCamera}
                            />
                            <Button
                                title='Galery'
                                onPress={getImageFromGallery}
                            />

                        </View>
                        <Input
                            placeholder="Full-Name"
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            onChangeText={(name) => setNAme(name)}
                            value={name}
                        />
                        <Input
                            placeholder="Phone Number"
                            // leftIcon={{ type: 'font-awesome', name: 'mobile-o' }}
                            onChangeText={(phone) => setPhone(phone)}
                            value={phone}
                        />
                        <Input
                            placeholder="Email"
                            leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                            onChangeText={(email) => setEmail(email)}
                            value={email}
                        />
                        <Input
                            placeholder="Address"
                            leftIcon={{ type: 'font-awesome', name: 'address-card' }}
                            onChangeText={(address) => setAddress(address)}
                            value={address}
                        />
                        <View>
                            <Button
                                onPress={() => setModal(false)}
                                style={{ color: 'blue', justifyContent: 'center', marginTop:-10, padding: 15 }}
                                title='Cancel'
                            />
                        </View>
                        <View>
                            <Button
                                onPress={() => {
                                    handelSubmit();
                                    resetForm();
                                }}
                                style={{ color: 'blue', justifyContent: 'center', marginTop: -5, padding: 15 }}
                                title='Submit'
                            />
                            <Button
                                onPress={() => sendMail()}
                                title='Send Email'
                                style={{ marginTop: -20, backgroundColor: 'transparent', justifyContent: 'center', padding: 15 }}
                                icon={
                                    <Icon
                                        name='envelope-o'
                                        type='font-awesome'
                                        color='black'
                                        iconStyle={{ marginright: 10 }}

                                    />
                                }
                            />
                        </View>

                    </View>
                </View>
            </Modal>
        </View>








    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    container: {
        modal: {
            justifyContent: 'center',
            margin: 0,

        },
        text: {
            color: 'yellow',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontStyle: 'italic'
        },
        button: {
            color: 'blue',
            justifyContent: 'center',
            padding: 0,
        },
        hide: {
            color: 'transparent',
            padding: 0,
            justifyContent: 'center',
            marginTop: 0,
        },
        imageContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: 0
        },
        // image:{
        //     widht:30,
        //     height:30

        // }
    }
})


export default LoggingScreen;