import React, { useState } from "react";
import { View, Dimensions, Image, Text, TouchableOpacity } from "react-native";


export const Resto = [

    {    id:"1",
        title: "realOne",
        source: require('../../assets/images/MexicanChicken.jpg'),

        field: "vegetariant",
        delivery: "",
        rate: ""

    },
    {   id:"2",
        title: "realTwo",
        source:require("../../assets/images/salad.jpg"),
        field: " Salad",
        delivery: "",
        rate: ""

    },
    {   id:"3",
        title: "realThree",
        source:require('../../assets/images/healthy.jpeg'),
        delivery: "",
        rate: ""

    },



];


const RestauCard = ({ item }) => {

    const ScreenWidth = Dimensions.get('window').width
    const Width = Math.round(ScreenWidth * 0.35)
    const ScreenHeight = Dimensions.get("window").height
    const  Height = Math.round(ScreenHeight*0.1)

    return (

        <View>
            <TouchableOpacity>
                <Image
                    source={item.source}
                    style={{ margin: 10, borderRadius: 25, width: Width, height:Height }} 
                />
                <Text>{item.title}</Text>
                <Text>{item.delivery}</Text>

            </TouchableOpacity>

        </View>
    )

}
export default RestauCard;

