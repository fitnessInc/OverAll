import React, { useState, useEffect, useRef, } from "react";
import { View, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Text, Button, } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import CarouselCardItem from "./CarouselItem";
import { SliderWidth, ItemWidth } from "./CarouselItem";
import Data from "../../assets/data";
import Food from "../screens/food";
import Order from "../screens/Order";
import { NavigationContainer } from '@react-navigation/native';
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";




export default function CarouselCard({ navigation }) {

  const [index, setIndex] = useState(0);
  const xCarousel = useRef(null)

  return (
    <SafeAreaView>
      <Carousel
        layout="tinder"
        layoutCardOffset={9}
        ref={xCarousel}
        data={Data}
        renderItem={CarouselCardItem}
        sliderWidth={SliderWidth}
        itemWidth={ItemWidth}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}

      />
      <Pagination
        dotsLength={Data.length}
        activeDotIndex={index}
        carouselRef={xCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: "rgba(0, 0, 0, 0.92)",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Food")}>
        <LinearGradient
          colors={['white', 'green', 'white']}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Text style={styles.text}>Customize Your Meal</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Order')}>
        <LinearGradient
          colors={["white", 'green', 'white']}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Text style={styles.text}>Place Your Order</Text>
        </LinearGradient>
      </TouchableOpacity>



    </SafeAreaView>
  )

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    
    
    

  },

  text: {
    fontSize: '15',
    fontVariant: 'bold',
    fontWeight: '900',
    color: 'white',
    borderCurve: 4,
    borderRadius: 20
  }
});






