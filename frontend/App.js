import { useState, useEffect } from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ListItem from './components/ListItem'
import RecipeDisplay from './components/RecipeDisplay'
import { useFonts } from "expo-font";
import ListView from "./components/ListView";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import config from "./config";

export default function App() {

    // Load fonts globally
    const [fontsLoaded] = useFonts({
        "REMA-regular": require("./assets/REMA-Regular.ttf"),
        "REMA-bold": require("./assets/REMA-Bold.ttf"),
    });

    const API_URL = config.SERVER_ADDRESS;


    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const resp = await fetch(`${API_URL}/api/search/name?name=melk`)
                const json = await resp.json()
                setData(json)
            } catch (err) {
                console.error("Failed to fetch data:", err)
                setError(err.message)
                // Set some default data so the app still works
                setData({ products: [] })
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    const [listItems, setListItems] = useState([
        { id: 0, name: "Kjøttdeig 400g", brand: "Nortura", price: 73.9, count: 1 },
        { id: 1, name: "Kjøttdeig 400g, 14%", brand: "Rema 1000", price: 64.9, count: 1 }
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
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container, {paddingTop: 0}]} >
                <View style={styles.container}>
                    <StatusBar style="light" />
                    {loading ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#fff', fontSize: 18 }}>Loading...</Text>
                        </View>
                    ) : error ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                            <Text style={{ color: '#ff6b6b', fontSize: 16, textAlign: 'center' }}>
                                Failed to connect to server
                            </Text>
                            <Text style={{ color: '#888', fontSize: 12, marginTop: 10, textAlign: 'center' }}>
                                {error}
                            </Text>
                        </View>
                    ) : (
                        data && <ListView data={data} setListItems={setListItems} listItems={listItems} />
                    )}
                    {/* <RecipeDisplay backendUrl={API_URL} /> */}
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#171718",
    },
});
