import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Ionicons from 'react-native-vector-icons'
import { Images } from '../config/images';
import { Image, View } from 'react-native';
import CalisthenicScreen from '../screens/CalisthenicScreen';
import GymScreen from '../screens/GymScreen';
import MealScreen from '../screens/MealScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import ChatScreen from '../screens/ChatScreen';
import { BlurView } from 'expo-blur';
import { DefaultTheme } from "@react-navigation/native"
import LoggingScreen from '../screens/LoggingScreen';
import CarouselCard from '../components/carousel';
import Food from '../screens/food';
import Order from '../screens/Order';
import Profiles from '../screens/Profiles';
import Pro from '../screens/trainersPro/profileOne'
import EditPro from '../screens/trainersPro/trainerEdiPro'




const Tab = createBottomTabNavigator();


export default function Navigation() {
    return (
        <NavigationContainer theme={MyTheme} >
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = Images.homeIcon;
                    } else if (route.name === 'Settings') {
                        iconName = Images.settingsIcon;
                    } else if (route.name == 'Workout') {
                        iconName = Images.workoutIcon;
                    } else if (route.name == 'Meal') {
                        iconName = Images.mealIcon;
                    } else if (route.name == 'Logging') {

                        return <Image className="w-6 h-6" source={Images.LoggingIcon} />;
                    } else if (route.name == "Food") {
                        iconName: () => null;

                    }else if (route.name==='Order'){
                        iconName:()=>null;
                    }else if(route.name ==='Profiles'){
                        iconName: () => null;

                    }else{
                        iconName= Images.chatIcon
                    }

                    return <Image source={iconName} style={{ tintColor: focused ? 'white:' : "white", width:30,height:30 }}
                    />;
                    
                },

                tabBarInactiveTintColor: 'black',
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: -10,
                    color: "white"
                },
                tabBarStyle: {
                    paddingTop: 12,
                    // position: 'absolute',
                },

                tabBarBackground: () => (
                    <View intensity={60} className="backdrop-blur-sm bg-white/30" />
                )

            })}>


                <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false, }} />
                <Tab.Screen name="Workout" component={WorkoutScreen} options={{ headerShown: false }} />
                <Tab.Screen name="Meal" component={CarouselCard} options={{ headerShown: false }} />
                <Tab.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
                <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
                {/* <Tab.Screen name="Logging" component={LoggingScreen} options={{ headerShown: false }} /> */}
                <Tab.Screen name="Food"
                    component={Food}
                    options={{
                        headerShown: false,
                        tabBarLabel: () => null,
                        tabBarButton: (props) => null,
                    }}
                />
                <Tab.Screen name="Profiles"
                    component={Profiles}
                    options={{
                        headerShown: false,
                        tabBarLabel: () => null,
                        tabBarButton: (props) => null,
                    }}
                />
                <Tab.Screen name="Pro"
                    component={Pro}
                    options={{
                        headerShown: false,
                        tabBarLabel: () => null,
                        tabBarButton: (props) => null,
                    }}
                />
                <Tab.Screen name="EditPro"
                    component={EditPro}
                    options={{
                        headerShown: false,
                        tabBarLabel: () => null,
                        tabBarButton: (props) => null,
                    }}
                />

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