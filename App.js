import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Navigation from './src/navigation/navigation';
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import image from './assets/images/soccer.png';
import 'react-native-gesture-handler';
import MealStackNavigator from './src/navigation/MealStackNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';





export default function App() {
  return (
    <>
      
        <SafeAreaProvider>
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
        </SafeAreaProvider>
      
    </>
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
