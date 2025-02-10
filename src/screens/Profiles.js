
import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { ListItem, Avatar, Button } from 'react-native-elements'





const data = [
    {
        id: '1',
        Full_Name: 'nanito Nanitosse',
     
        Address: 'inconito',
       
        Function: 'Calisthenics',
        Certification: ' Certification: Nasam',
        url:require('../../assets/icon.png'),
      


    },
    {
        id: '2',
        Full_Name: 'Aicha Ahmat',
      
        Address: ' Address: 646 berge ave NJ',
        Function: ' body weight trainer ',
        Certification: 'Nasam',
        url: require('../../assets/favicon.png'),
       

    },
    {
        id: '3',
        Full_Name: 'Alato Sow',
        Address: ' Address: 646 berge ave NJ',
        Function: ' weight trainer ',
        Certification: 'Certification: Nasam',
        url: require('../../assets/photo.jpg'),
       

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
                <ListItem.Title>{item.Full_Name}</ListItem.Title>
                <ListItem.Title>{item.Function}</ListItem.Title>
                <ListItem.Title>{item.Certification}</ListItem.Title>
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