
import React from "react";
import { FlatList, StyleSheet, SafeAreaView } from "react-native";
import { ListItem, Avatar, } from 'react-native-elements';


const data = [
    {
        id: '1',
        Full_Name: 'nanito Nanitosse',

        Address: 'inconito',
        Function: 'Calisthenics',
        Certification: ' Certification: Nasam',
        meta: null,
        url: require('../../assets/images/Hannibal.jpg')



    },
    {
        id: '2',
        Full_Name: 'Aicha Ahmat',

        Address: ' Address: 646 berge ave NJ',
        Function: ' body weight trainer ',
        Certification: 'Nasam',
        meta: null,
        url: require('../../assets/images/Hannibal.jpg')


    },
    {
        id: '3',
        Full_Name: 'Alato Sow',
        Address: ' Address: 646 berge ave NJ',
        Function: ' weight trainer ',
        Certification: 'Certification: Nasam',
        meta: null,
        url: require('../../assets/images/Hannibal.jpg')


    },

];




const Profiles = ({ navigation, route, }) => {
    //   const {item} = route.params|| {};
    //   console.log("Received item in Pro:", item);


    const renderItem = ({ item }) => (
        <ListItem bottomDivider onPress={() => navigation.navigate('Pro',
            {
                item:
                {
                    Full_Name: item.Full_Name,
                    Address: item.Address,
                    Function: item.Function,
                    Certification: item.Certification,
                    
                }
            }
        )}>
            <Avatar
                source={item.url}
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
                keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())}
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