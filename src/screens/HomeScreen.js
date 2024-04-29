import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

const HomeScreen = () => {
    const obj = Array.from({length: 100}, (_,index) => (index +1));
  return (
    <SafeAreaView>
        <ScrollView>
            <View>
               {obj.map(item => (
                <View>
                    <Text>Hello</Text>
                </View>
               ))}
            </View>
            
        </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen