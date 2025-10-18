import React from "react";
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

if (!fontsLoaded) return null; // wait for fonts to load

return (
        <SafeAreaView style={styles.container}>
            <ListView />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
