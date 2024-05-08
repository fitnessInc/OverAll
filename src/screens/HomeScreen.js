import { View, Text, SafeAreaView, ScrollView, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Card } from '@rneui/themed';
import Calisthenics from "../../assets/images/calisImg.jpg"
import { Tile } from '@rneui/themed';
import gym from '../../assets/images/gym.jpg';
import nutrition from '../../assets/images/nutrution.jpg';

const HomeScreen = () => {



 return (
  <ScrollView style={{ paddingVertical: 10 }}>
    <View style={{ alignItems: 'center' }}>
      <Tile
        imageSrc={Calisthenics}
        featured
        height={200}
        //   onPress={() => navigation.navigate('Intake')}
      />
      {/* Add margin to create space between tiles */}
      <View style={styles.space} />
      <Tile
        imageSrc={gym}
        featured
        height={200}
        //   onPress={() => navigation.navigate('Intake')}
      />
      {/* Add margin to create space between tiles */}
      <View style={styles.space} />
      <Tile
        imageSrc={nutrition}
        featured
        height={200}
        //   onPress={() => navigation.navigate('Intake')}
      />
    </View>
  </ScrollView>
);
}

const styles = StyleSheet.create({
space: {
  marginVertical: 20, 
},
});





// const Styles = StyleSheet.create({
//   Card: {

//     shadowColor: 'rgba(0,0,0, .2)',
//     shadowOffset: { height: 0, width: 0 },
//     shadowOpacity: 0, //default is 1
//     shadowRadius: 0//default is 1
//   }

// })


export default HomeScreen