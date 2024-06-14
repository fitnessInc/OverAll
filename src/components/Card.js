import React, { useState, useEffect } from "react";
import { View, Dimensions,TouchableHighlight , Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useAnimatedKeyboard } from "react-native-reanimated";
import Search from 'react-native-search-box';
import AtoZListView from 'react-native-atoz-listview';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';



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
]




const RestauCard = ({ item }) => {
    const [data, setData] = useState([]);
    const [rating, setRating] = useState(0);
  
    const rowHeight = 60;
  
    const renderRow = (item, sectionId, index) => (
      <TouchableHighlight
        style={{
          height: rowHeight,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>{item.name}</Text>
      </TouchableHighlight>
    );
  
    const onSearch = (searchText) => {
      return new Promise((resolve, reject) => {
        console.log(searchText);
        console.log('Add your search function here.');
        resolve();
      });
    };
  
    useEffect(() => {
      const beforeFocus = () => {
        return new Promise((resolve, reject) => {
          console.log('beforeFocus');
          resolve();
        });
      };
  
      const onFocus = (text) => {
        return new Promise((resolve, reject) => {
          console.log('onFocus', text);
          resolve();
        });
      };
  
      // Add any additional side effects or cleanup here if needed
    }, []);
  
    const handleRating = (rating) => {
      console.log(`rating is: ${rating}`);
      setRating(rating); // Update the rating state
    };
  
    const ScreenWidth = Dimensions.get('window').width;
    const Width = Math.round(ScreenWidth * 0.35);
    const ScreenHeight = Dimensions.get("window").height;
    const Height = Math.round(ScreenHeight * 0.1);
  
    return (
      <View>
        <Search
          ref="search_box"
          onSearch={onSearch}
        />
        <AtoZListView
          data={data}
          renderRow={renderRow}
          rowHeight={rowHeight}
          sectionHeaderHeight={40}
        />
        <TouchableOpacity>
          <Image
            source={item.source}
            style={{ margin: 10, borderRadius: 25, width: Width, height: Height }}
          />
          <Text style={Styles.text}>{item.title}</Text>
          <Text>{item.delivery}</Text>
          <AirbnbRating
            count={5}
            defaultRating={rating}
            size={20}
            starContainerStyle={{ alignSelf: 'flex-start', marginTop: -25 }}
            onFinishRating={handleRating}
          />
        </TouchableOpacity>
      </View>
    );
  };
  


const Styles = StyleSheet.create({
    text: {
        color: "black",
        textAlign: 'left',
        marginTop: -1


    }
})











export default RestauCard;

