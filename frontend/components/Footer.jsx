import React from "react"
import { StyleSheet, Text, View } from 'react-native';
import { Button } from "@rneui/base"
import ListButtons from "./ListButtons"

export default function Footer(props) {
    return (

        <View>
            {/* <View style={styles.buttonWrapper}>
                <Button
                    title="Text"
                    buttonStyle={{padding: 20, width: "70%"}}
                ></Button>
                <Button
                    title="Text"
                    buttonStyle={{padding: 20, width: "70%"}}
                ></Button>
            </View> */}
            <ListButtons></ListButtons>
            <View style={styles.bottom}>

                <Text style={styles.text}>Sum: {props.sum} kr</Text>
                <Text style={styles.text}>CO₂: {props.carbon} kg</Text>
            </View>
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