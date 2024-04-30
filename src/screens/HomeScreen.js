import { View, Text, SafeAreaView, ScrollView, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Card } from '@rneui/themed';
import Calisthenics from "../../assets/images/calisImg.jpg"

const HomeScreen = () => {
  const obj = Array.from({ length: 100 }, (_, index) => (index + 1));
  return (
    <SafeAreaView>
      <ScrollView>
        <Card style={{ height:40 }}>
          <Card.Title >CAlisthenics</Card.Title>
          <Card.Divider />
          <View style={{ flex: 1, height:300, }} >
            <Image
              style={{ width: "100", height:350}}
              esizeMode="cover"
              source={require('../../assets/images/calisImg.jpg')}
            />
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  )
}


//  const Styles = StyleSheet{

//   }

export default HomeScreen