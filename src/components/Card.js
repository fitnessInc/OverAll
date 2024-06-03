import React, { useState } from "react";
import { Card, Text, Button } from "@rneui/themed";
import { View, ScrollView, StyleSheet, Image } from 'react-native'
import { View, Modal, TouchableWithoutFeedback, Image, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import Bulking from '../assets/foodimg/bulking.jpg';
import lean from '../assets/foodimg/food.jpg'
import vege from '../assets/foodimg/vege.jpg'




export default function  Card ({ item }){

    return (
        <ScrollView>
        //         <View style={{
        //            addingTop: insets.top,
        //            paddingBottom: insets.bottom,
        //            paddingLeft: insets.left,
        //            paddingRight: insets.right,
        //            minHepight:'auto'
        
        //       }} >
                 
        //           <Card style={Styles.Card} >
        //               <View>
        //                   <Card.Title style={Styles.text}>bulking Food</Card.Title>
        //                   <CardDivider />
        //                   <Card.Image
        //                       source={{ uri: 'https://www.maxinutrition.com/Images/meal%20prep.jpg' }}
        //                       style={Styles.CardIm}
        
        //                   />
        //                   <Text>Hello</Text>
        //               </View>
        
        //           </Card>
        //           <Card>
        //               <View>
        //                   <Card.Title style={Styles.text}> Specific lean Muscle Food</Card.Title>
        //                   <CardDivider style={{ margin: -15 }} />
        //                   <Card.Image
        //                       source={{ uri: 'https://www.shutterstock.com/image-photo/health-body-building-food-fish-600nw-323086574.jpg' }}
        //                       style={Styles.CardIm}
        //                   />
        //                   <Text style={Styles.layText}>Hello</Text>
        //               </View>
        
        //           </Card>
        //           <Card>
        //               <View>
        //                   <Card.Title  style={Styles.text}>Vegetarian Food</Card.Title>
        //                   <CardDivider />
        //                   <Card.Image
        //                       source={{ uri: 'https://static.vecteezy.com/system/resources/previews/029/213/975/large_2x/healthy-eating-dieting-and-vegetarian-food-concept-assortment-of-superfoods-in-bowls-on-black-background-assortment-of-healthy-food-dishes-top-view-ai-generated-free-photo.jpg' }}
        //                       style={Styles.CardIm}
        //                   />
        //                   <Text>Hello</Text>
        //               </View>
        
        //           </Card>
        //       </View>
        
        
             
        //   </ScrollView>
        
    )






}

