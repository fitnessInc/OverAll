import { View, Text, SafeAreaView, ScrollView, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Card } from '@rneui/themed';
import Calisthenics from "../../assets/images/calisImg.jpg"
import { Tile } from '@rneui/themed';
import gym from '../../assets/images/gym.jpg';
import nutrition from '../../assets/images/nutrution.jpg';
import Profiles from './Profiles';


const HomeScreen = ({navigation}) => {



 return (
  <ScrollView style={{ paddingVertical: 10 }}>
    <View style={{ alignItems: 'center' }}>
      <Tile
        imageSrc={Calisthenics}
        featured
        height={200}
         onPress={() => navigation.navigate('Profiles')}
      />
      
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







export default HomeScreen