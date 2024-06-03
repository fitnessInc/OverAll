import React, { useState } from "react";
import { Card, Text, Button } from "@rneui/themed";
import { View, ScrollView, ImageBackground, Image, SafeAreaView } from 'react-native'
import { Modal, TouchableWithoutFeedback, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';


import { CardDivider } from "@rneui/base/dist/Card/Card.Divider";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const Data = [

    {
        id: '1',
        title: "Bulking Food",
        source: require('../../assets/FitImg/balk1.jpg'),
        items: ["Chicken Breast", "Avocado", "shrimp", "salmon", "quinoa", "sweet potatoes"]

    },
    {
        id: '2',
        title: "Lean Muscle Food",
        source: require('../../assets/FitImg/balk.jpg'),
        items: ["Tofu", "lantil", 'beans', "White Eggs", "Soybean", "lean Beef"]
    },
    {
        id: '3',
        title: "Vegetarian Food",
        source: require('../../assets/images/vege.jpg'),
        items: ['Falafel', 'legumes', "WholeGrain", "olive Oil", "thempeh"]
    }

];

const Item = ({ item }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const Width = Dimensions.get('window').width;
    const winWidth = Math.round(Width * 0.40)

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    



    return (
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', }} onPress={openModal}>
            <View style={{ width: winWidth, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginRight: 10, marginBottom: 10 }}>

            
                 <Image
                    source={item.items.length > 0 ? item?.source : null}
                    // source={selectedItem1.source}
                    resizeMode="contain"
                    style={{ width: winWidth, height: 100, borderRadius: 14 }}
                /> 
                <Text>{item?.title}</Text> 

            </View >

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20 }}>
                        <Text>Select an item:</Text>
                        {item.items.map((item, index) => (
                            <Button key={index} title={item} onPress={() => console.log(item)} />
                        ))}
                        <Button title="Close" onPress={closeModal} />
                    </View>
                </View>
            </Modal>
        </TouchableOpacity >
    );
};





export default function Food({ item }) {


    return (
        <SafeAreaView style={{ flex: 1, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
                data={Data}
                renderItem={({item}) => <Item item={item} />}
                keyExtractor={item => item.id}
                numColumns={2}
                // ItemSeparatorComponent={() => <View style={{height: 20, width: 20 }}/>}
            />

        </SafeAreaView>






    )



}

const Styles = StyleSheet.create({

    scrollView: {
        paddingVertical: 50,
        marginTop: "auto"

    },
    CardIm: {
        resizeMode: 'stretch',
        // height:100,
        // width:100,
        paddingTop: 30


    },

    CardDiv: {
        marginTop: -80

    },

    layText: {
        color: 'black',
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center',

    },


    container: {

        alignContent: 'center',
        alignItems: 'center',
        flex: 1



    },
    overlayText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Semi-transparent background for better readability
        padding: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'

    },
    topRow: {
        flexDirection: 'row',
        flex: 1
    },
    bottomRow: {
        marginTop: 20,
    },
    image: {
        width: 100,
        height: 100,
        marginHorizontal: 5,
    },






})

