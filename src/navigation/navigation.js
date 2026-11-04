import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Images } from '../config/images';
import { Image, View } from 'react-native';
import ChatScreen from '../screens/ChatScreen';
import { DefaultTheme } from "@react-navigation/native"
import LoggingScreen from '../screens/LoggingScreen';
import Profiles from '../screens/Profiles';
import Pro from '../screens/trainersPro/profileOne'
import EditPro from '../screens/trainersPro/trainerEdiPro';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, clearAuth } from '../../redux/slices/authSlice';
import { useEffect } from 'react';
import ActivityIndicator from '../components/activityIndicator';
import SignUpScreen from '../screens/singnUp';
import { auth } from '../../firebase/configue';
import { onAuthStateChanged } from 'firebase/auth';




const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ProfileStackScreen() {
    return (

        <Stack.Navigator>
            <Stack.Screen name="Profiles" component={Profiles} options={{ headerShown: false }} />
            <Stack.Screen name="Pro" component={Pro} options={{ headerShown: false }} />
            <Stack.Screen name="EditPro" component={EditPro} options={{ headerShown: false }} />
        </Stack.Navigator>

    );
};

function myProfile() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Pro" component={Pro} options={{ headerShown: false }} />
            <Stack.Screen name="EditPro" component={EditPro} options={{ headerShown: false }} />
        </Stack.Navigator>
    )

};

const Auth = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Logging" component={LoggingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SingUp" component={SignUpScreen} options={{ headerShown: false }} />
        </Stack.Navigator>

    )

}




export default function Navigation() {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const indicator = useSelector((state) => state.auth.indicator);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (fbUser) => {
            if (fbUser) {
                dispatch(setAuth({ uid: fbUser.uid, email: fbUser.email }));
            } else {
                dispatch(clearAuth());
            }
        });
        return unsub;


    }, [dispatch]);
    if (indicator) return <ActivityIndicator />



    return (
        <NavigationContainer theme={MyTheme} >
            {user ? (

                <Tab.Navigator screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = Images.homeIcon;
                        } else if (route.name === 'Settings') {
                            iconName = Images.settingsIcon;

                        } else if (route.name == 'Logging') {

                            return <Image className="w-6 h-6" source={Images.LoggingIcon} />;

                        } else {
                            iconName = Images.meIcon

                        }

                        return <Image source={iconName} style={{ tintColor: focused ? 'white' : "white", width: 30, height: 30 }}
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
                    <Tab.Screen name="me" component={myProfile} options={{ headerShown: false }} />
                    <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
                    <Tab.Screen
                        name="ProfilesTab"
                        component={ProfileStackScreen}
                        options={{
                            headerShown: false,
                            tabBarLabel: () => null,
                            tabBarButton: (props) => null,
                        }}
                    />

                </Tab.Navigator>

            ) : (
                <Auth />
            )}
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