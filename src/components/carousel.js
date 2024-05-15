import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Carousel, { Pagination } from "react-native-snap-carousel";
// import CarouselCardItem, { SliderWidth, ItemWidth } from "/CarouselCardItem";
import CarouselCardItem from "./CarouselItem";
import { SliderWidth,ItemWidth } from "./CarouselItem";
import  Data  from "../../assets/data";

export default function CarouselCard() {

  const [index, setIndex] = useState(0);
  const xCarousel = useRef(null)

  return(
    <View>
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

    </View>
  )

};






