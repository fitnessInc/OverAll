import React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import RestauCard from "../components/Card";
import { Resto } from "../components/Card";






export default function Order({ item }) {

    return (
        <SafeAreaView>
            <FlatList
                horizontal
                data={Resto}
                renderItem={({ item }) => <RestauCard item={item} />}
                snapToAlignment='center'
                keyExtractor={Resto.id}
                contentContainerStyle={{ paddingVertical:"100%" }}
            />

        </SafeAreaView>
    )
}
