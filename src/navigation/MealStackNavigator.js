import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CarouselCard from '../components/carousel';
import Food from '../screens/food';
import Order from '../screens/Order';

const Stack = createStackNavigator();

function MealStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CarouselCard" component={CarouselCard} />
            <Stack.Screen name="Food" component={Food} />
            <Stack.Screen name="Order" component={Order} />
        </Stack.Navigator>
    );
}

export default MealStackNavigator;