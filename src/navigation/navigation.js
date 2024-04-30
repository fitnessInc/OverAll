import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Images } from '../config/images';
import { Image, View } from 'react-native';
import CalisthenicScreen from '../screens/CalisthenicScreen';
import GymScreen from '../screens/GymScreen';
import MealScreen from '../screens/MealScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import ChatScreen from '../screens/ChatScreen';
import { BlurView } from 'expo-blur';
import {DefaultTheme} from  "@react-navigation/native"

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer   theme={MyTheme} >
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = Images.homeIcon;
                    } else if (route.name === 'Settings') {
                        iconName = Images.settingsIcon;
                    } else if(route.name == 'Workout') {
                        iconName = Images.workoutIcon;
                    } else if(route.name == 'Meal') {
                        iconName = Images.mealIcon;
                    } else {
                        iconName = Images.chatIcon;
                    }

                    return <Image className="w-6 h-6" source={iconName} />;
                },

                tabBarInactiveTintColor: 'black',
                tabBarLabelStyle : {
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: -10,
                    color:"white"
                },
                tabBarStyle : {
                    paddingTop: 12,
                    // position: 'absolute',
                },

                tabBarBackground: () => (
                    <View intensity={60} className="backdrop-blur-sm bg-white/30" />
                )
             
            })}>

            
                <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false, }} />
                <Tab.Screen name="Workout" component={WorkoutScreen} options={{ headerShown: false }} />
                <Tab.Screen name="Meal" component={MealScreen} options={{ headerShown: false }} />
                <Tab.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
                <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
            
                
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255, 45, 85)',
      background: 'transparent',
    },
  };