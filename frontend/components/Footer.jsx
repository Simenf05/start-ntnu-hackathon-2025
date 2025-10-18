import React from "react"
import { StyleSheet, Text, View } from 'react-native';

export default function Footer(props) {
    return (

    <View style={styles.wrapper}>
        <Text style={{fontFamily: "REMA-regular"}}>Sum: {props.sum}</Text>
        <Text style={{fontFamily: "REMA-regular"}}>CO₂: {props.carbon}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "#f00",
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: 100
    }
})