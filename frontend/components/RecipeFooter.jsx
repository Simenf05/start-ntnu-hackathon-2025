import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from "@rneui/base"
import ListButtons from "./ListButtons"

export default function RecipeFooter(props) {
    return (

        <View style={{ paddingHorizontal: 16 }}>
    <TouchableOpacity
        onPress={() => props.onAdminPreferences()}
        style={{
            backgroundColor: "#034C8C",
            borderRadius: 8,
            paddingVertical: 12,
            alignItems: "center",
            marginVertical: 12,
        }}
    >
        <Text style={{ color: "#fff", fontFamily: "REMA-regular", fontSize: 16 }}>
            Administrer matpreferanser
        </Text>
    </TouchableOpacity>
</View>

    )
}

const styles = StyleSheet.create({
    bottom: {
        backgroundColor: "#171718",
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: 100,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: 20,
        borderTopWidth: 2,
        borderColor: "#808080",
        borderStyle: "solid"
    },
    text: {
        fontFamily: "REMA-regular", 
        color: "#fff",
        fontSize: 16
    },
    buttonWrapper: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
        paddingVertical: 24,
        gap: "10%",
    }
})