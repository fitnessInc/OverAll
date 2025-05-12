
import React from "react";
import { FlatList, StyleSheet, SafeAreaView } from "react-native";
import { ListItem, Avatar, } from 'react-native-elements';
import { useSelector } from "react-redux";


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

    const profilePIcture = useSelector(state=>state.image.profile);

    
    const item = useSelector(state => state.info.infoPro);
    const itemCon = Object.entries(item);
    


    const renderItem = ( {item}) => (
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
                source={{uri:profilePIcture?.meta}}
                size="medium"
                icon={{ name: 'person', type: 'material', color: 'white' }}
                overlayContainerStyle={{ backgroundColor: 'black' }}
                rounded
            />
            <ListItem.Content>
                <ListItem.Title>{itemCon.infoPro?.Full_Name}</ListItem.Title>
                <ListItem.Title>{itemCon.infoPro?.Function}</ListItem.Title>
                <ListItem.Title>{itemCon.infoPro?.Certification}</ListItem.Title>
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