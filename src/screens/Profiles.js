
import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { ListItem, Avatar, Button } from 'react-native-elements'





const data = [
    {
        id: '1',
        First_Name: ' First_NAme: nanito',
        Last_Name: 'Last_Name: azarag',
        Address: 'Address: inconito',
       
        Field: 'Field: Calisthenics',
        Certification: ' Certification: Nasam',
        url:require('../../assets/icon.png'),
        subTitle: 'Function: trainer'


    },
    {
        id: '2',
        First_Name: ' First_Name Aicha',
        Last_Name: 'Ahmat',
        Address: ' Address: 646 berge ave NJ',
        Field: 'Field :weight ',
        Certification: 'Nasam',
        url: require('../../assets/favicon.png'),
        subTitle: 'trainer'

    },
    {
        id: '3',
        First_Name: ' First_Name:Alato',
        Last_Name: 'Last_Name :Migo',
        Address: ' Address: 646 berge ave NJ',
        Field: 'Field :weight ',
        Certification: 'Certification: Nasam',
        url: require('../../assets/photo.jpg'),
        subTitle: 'trainer'

    },
];



const Profiles = ({ navigation }) => {




    const renderItem = ({ item }) => (




        <ListItem bottomDivider onPress={() => navigation.navigate('Pro', { item })}>
            <Avatar
                source={  item.url }
                size="medium"
                icon={{ name: 'person', type: 'material', color: 'white' }}
                overlayContainerStyle={{ backgroundColor: 'black' }}
                rounded
            />
            <ListItem.Content>
                <ListItem.Title>{item.First_Name}</ListItem.Title>
                <ListItem.Title>{item.subTitle}</ListItem.Title>
            </ListItem.Content>
        </ListItem>


    )




    return (
        <SafeAreaView
            style={{ flex: 1, marginTop: 70 }}
        >
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}


            />
        </SafeAreaView >

    )




}


const styles = StyleSheet.create({

    avatar: {
        width: 30,
        height: 30,
    },




});




export default Profiles