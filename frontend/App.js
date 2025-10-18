import { useState, useEffect } from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ListItem from './components/ListItem'

import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import ListView from "./components/ListView";
import { SafeAreaView } from "react-native-safe-area-context"

export default function App() {
    // Load fonts globally
    const [fontsLoaded] = useFonts({
        "REMA-regular": require("./assets/REMA-Regular.ttf"),
        "REMA-bold": require("./assets/REMA-Bold.ttf"),
    });

    const API_URL = 'http://10.10.30.113:5000/'

    const [data, setData] = useState()

    useEffect(() => {
        (async () => {
            const resp = await fetch(`${API_URL}/api/search/name?name=kjøtt`)
            const json = await resp.json()
            setData(json)
        })()
    }, [])

    const [listItems, setListItems] = useState([
        { id: 0, itemName: "Kjøttdeig 400g", brand: "Nortura", price: 73.9, count: 1 },
        { id: 1, itemName: "Kjøttdeig 400g, 14%", brand: "Rema 1000", price: 64.9, count: 1 }
    ]);

    const handleChangeCount = (id, newCount) => {
        setListItems(prev =>
            prev
                .map(item => item.id === id ? { ...item, count: newCount } : item)
                .filter(item => item.count > 0)
        );
    };

    const handleToggleChecked = (id) => {
        setListItems(prev =>
            prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
        );
    };

    if (!fontsLoaded) return null; // wait for fonts to load

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <StatusBar style="auto" />

                {data && <ListView data={data} />}

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
