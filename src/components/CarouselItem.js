import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";






export const SliderWidth = Dimensions.get('window').width;
export const ItemWidth = Math.round(SliderWidth * 0.95);

export default function CarouselCardItem({ index, item }) {
    return (
        < View  style={Styles.container} key={{index}}>
            <Image source={{ uri: item.imgUrl }} style={Styles.image} />
            <Text style={Styles.header}>{item.title}</Text>
            <Text style={Styles.body}>{item.body}</Text>
        </View>
    )

}


const Styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        marginTop:200,
        borderRadius: 10,
        width: ItemWidth,
        paddingBottom: 250,
        height:200,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center'
       
    
    },
    image: {
        width: ItemWidth,
        height: 300,
        
    },
    header: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 20,
        paddingTop: 20,
    },
    body: {
        color: "black",
        fontSize: 18,
        fontWeight:'bold',
        paddingLeft: 20,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign:'center'
    },

});

