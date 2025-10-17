import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Button, CheckBox } from "@rneui/base"

export default function ListItem() {
    const [checked, setChecked] = React.useState(false)
    const toggleChecked = () => setChecked(!checked)
    return (
        <View style={styles.main}>
            <View>
                <Text>Hello, React Native!</Text>
                <Text>Ety</Text>
            </View>
            <CheckBox 
                onPress={() => toggleChecked()}
                checked={checked} 
                size={48}
                title={checked ? "rrt" : "444"}
            ></CheckBox>
            <Pressable onPress={() => console.log(2)}><Text>Test</Text></Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        width: "100%",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "#f00",
        borderRightWidth: 0,
        borderLeftWidth: 0,
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        fontSize: 48
    }
})
