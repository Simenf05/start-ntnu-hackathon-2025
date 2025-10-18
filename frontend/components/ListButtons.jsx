import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";

export default function SearchBarButtons() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button, styles.leftButton]}>
                <Text style={styles.text}>Søk opp vare</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.rightButton]}>
                <Text style={styles.text}><Image source={require("../assets/barcode.png")} style={{width: 60, objectFit: "contain"}}></Image></Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 20,
        // backgroundColor: "#171718", // just for contrast like your image
    },
    button: {
        flex: 1,
        height: 80,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
    },
    leftButton: {
        backgroundColor: "#77abd8ff",
    },
    rightButton: {
        backgroundColor: "#034C8C",
    },
    text: {
        color: "#fff",
        fontSize: 16
    },
});
