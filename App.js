import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ImageBackground } from 'react-native';
import Navigation from './src/navigation/navigation';
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import image from './assets/images/soccer.png';
import 'react-native-gesture-handler';



export default function App() {
  return (
    <ImageBackground

      source={image}
      style={{
        flex: 1,
        // resizeMode:'cover',
        justifyContent: 'center',

      }}

    >
      <Navigation />
    </ ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
