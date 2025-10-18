import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListItem from './components/ListItem'
import RecipeDisplay from './components/RecipeDisplay'

export default function App() {
    // If running on a physical device, change this to your machine IP, e.g.
    const backendUrl = 'http://192.168.1.42:5000';

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <ListItem />
            <RecipeDisplay backendUrl={backendUrl} />
        </View>
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
